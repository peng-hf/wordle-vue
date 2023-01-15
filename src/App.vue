<script setup>
import { reactive, watch } from 'vue'
import { allWords, getWordOfTheDay } from './util/words'
import {
  CELL_STATE,
  GAME_STATE,
  MAX_ATTEMPTS,
  waitFor,
  loadGame,
  saveGame,
  loadSettings,
  saveSettings,
  resetGame,
  isMobileOrTablet,
  setDocHeight
} from './util'
import Grid from './components/Grid.vue'
import Keyboard from './components/Keyboard.vue'
import Messages from './components/Messages.vue'

setDocHeight()

const word = getWordOfTheDay()
const game = reactive(loadGame())
const settings = reactive(loadSettings())
let messages = $ref([])

window.___DEBUG_GET_ANSWER__ = () => {
  console.log(`Answer is ${word}`)
}

const currentAnswer = $computed(() => {
  return game.matrix[game.currentRowIdx].map(c => c.letter).join('')
})

const currentRow = $computed(() => {
  return game.matrix[game.currentRowIdx]
})

const isRowRevealing = $computed(() => {
  return currentRow.some(cell => cell.reveal)
})

watch(
  () => settings.darkMode,
  bool => {
    if (bool) document.body.classList.add('dark')
    else document.body.classList.remove('dark')
    saveSettings(settings)
  },
  { immediate: true }
)

watch(
  () => [game.state, game.currentRowIdx],
  ([state, rowIdx]) => {
    const restartMsg = isMobileOrTablet()
      ? 'Click <b>here</b> to restart the game.'
      : 'Press <b>Shift + R</b> to restart the game.'

    if (state === GAME_STATE.WIN) {
      showMessage(`<b>You guessed the right word!</b><br>${restartMsg}`, {
        cb: () => {
          restartGame()
        }
      })
    }
    if (state === GAME_STATE.GAME_OVER) {
      showMessage(`Game over. The answer is <b>${word.toUpperCase()}</b>.<br>${restartMsg}`, {
        cb: () => {
          restartGame()
        }
      })
    }

    saveGame(game)
  },
  { immediate: true }
)

async function showMessage(text, { error = false, cb = null } = {}) {
  if (error) {
    const id = new Date().valueOf()
    messages.push({ text, id, cb })
    setTimeout(() => {
      messages = messages.filter(e => e.id !== id)
    }, 1200)

    for (const c of currentRow) {
      c.shake = true
      setTimeout(() => {
        c.shake = false
      }, 400)
    }
  } else {
    messages.push({ text, cb })
  }
}

function clearMessages() {
  messages.splice(0, messages.length)
}

async function revealRow(row) {
  for (const c of row) {
    await waitFor(250)
    c.reveal = true
  }
  await waitFor(800) // Wait for animation to complete on the last cell
}

async function restartGame() {
  resetGame(game)
  clearMessages()

  showMessage('<b>Game restarted</b>')
  await waitFor(800)
  clearMessages()
}

async function onPressKey(key) {
  if (isRowRevealing) return
  key = key.toLowerCase()
  if (key === 'backspace') {
    let targetCell = null // Find cell to clear
    for (let i = currentRow.length - 1; i >= 0; --i) {
      const cell = currentRow[i]
      if (cell.state !== CELL_STATE.EMPTY) {
        targetCell = cell
        break
      }
    }
    if (targetCell) {
      targetCell.clear()
    }
  } else if (key === 'enter') {
    if (currentAnswer === word) {
      await revealRow(currentRow)
      game.state = GAME_STATE.WIN
    } else if (game.currentRowIdx === MAX_ATTEMPTS) {
      await revealRow(currentRow)
      game.state = GAME_STATE.GAME_OVER
    } else if (currentAnswer.length < word.length) {
      showMessage('<b>Not enough letter</b>', { error: true })
    } else if (!allWords.includes(currentAnswer)) {
      showMessage('<b>Not in the word list</b>', { error: true })
    } else {
      await revealRow(currentRow)
      game.currentRowIdx++
    }
  } else {
    // Type a new letter
    let nextEmptyCellIdx

    // Find last empty cell and get its index
    const nextEmptyCell = currentRow.find((cell, idx) => {
      nextEmptyCellIdx = idx
      return cell.state === CELL_STATE.EMPTY
    })

    if (nextEmptyCell) {
      nextEmptyCell.letter = key
      if (word[nextEmptyCellIdx] === key) {
        nextEmptyCell.state = CELL_STATE.CORRECT
      } else if (word.includes(key)) nextEmptyCell.state = CELL_STATE.PRESENT
      else nextEmptyCell.state = CELL_STATE.ABSENT
    }
  }
}
</script>

<template>
  <div class="h-full relative flex flex-col bg-light-600 dark:bg-dark-900 overflow-hidden">
    <!-- Error messages -->
    <messages :messages="messages" />

    <!-- Header -->
    <div
      class="h-60px flex justify-between items-center bg-light-700 text-3xl font-semi-bold dark:(bg-dark-400 text-white)"
    >
      <div class="w-50px text-center">
        <a
          class="p-2 eva eva-github cursor-pointer hover:(opacity-70)"
          href="https://github.com/peng-hf/wordle-vue"
          target="_blank"
        />
      </div>
      <div>Wordle<sub class="text-xs pl-1">Clone</sub></div>
      <i
        :class="`w-50px p-2 text-center cursor-pointer hover:(opacity-70) 
        eva eva-${settings.darkMode ? 'sun-outline' : 'moon-outline'}`"
        @click="settings.darkMode = !settings.darkMode"
      />
    </div>

    <div class="flex flex-col flex-1 items-center justify-between">
      <div class="flex flex-1 items-center">
        <grid
          class="sm:my-30px"
          :matrix="game.matrix"
          :current-row-idx="game.currentRowIdx"
          :word="word"
        />
      </div>
      <keyboard
        class="sm:my-20px <sm:mb-20px"
        :matrix="game.matrix"
        @press-key="onPressKey"
        @restart="restartGame"
      />
    </div>
  </div>
</template>