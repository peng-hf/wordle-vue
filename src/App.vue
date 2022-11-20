<script setup>
import { reactive, watch } from 'vue'
import { allWords } from './util/words'
import {
  CELL_STATE,
  GAME_STATE,
  MAX_ATTEMPTS,
  waitFor,
  loadGame,
  saveGame,
  loadSettings,
  saveSettings,
  resetGame
} from './util'
import Grid from './components/Grid.vue'
import Keyboard from './components/Keyboard.vue'
import ErrorMessages from './components/ErrorMessages.vue'
// import Modal from './components/Modal.vue'

const word = 'hello'
const game = reactive(loadGame())
const settings = reactive(loadSettings())
let errors = $ref([])

const currentAnswer = $computed(() => {
  return game.matrix[game.currentRowIdx].map(c => c.letter).join('')
})

const currentRow = $computed(() => {
  return game.matrix[game.currentRowIdx]
})

const isRowRevealing = $computed(() => {
  return currentRow.some(cell => cell.reveal)
})

// debug
window.reset = () => {
  resetGame(game)
}

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
  () => game.state,
  state => {
    if (state === GAME_STATE.WIN) {
      console.log('you won!')
      resetGame(game)
    }

    if (state === GAME_STATE.GAME_OVER) {
      console.log('you lost!')
      resetGame(game)
    }

    if (state === GAME_STATE.PLAYING) {
      console.log('playing!! good luck :)')
    }
  },
  { immediate: true }
)

watch(
  () => game.matrix,
  matrix => {
    saveGame(game)
  },
  { immediate: true, deep: true }
)

async function showError(msg, matrixRow) {
  const id = new Date().valueOf()
  errors.push({ msg, id })
  setTimeout(() => {
    errors = errors.filter(e => e.id !== id)
  }, 1200)

  for (const c of matrixRow) {
    c.shake = true
    setTimeout(() => {
      c.shake = false
    }, 400)
  }
}

async function revealRow(row) {
  for (const c of row) {
    await waitFor(250)
    c.reveal = true
  }

  await waitFor(800) // Wait for animation to commplete on the last cell
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
      showError('Not enough letter', currentRow)
    } else if (!allWords.includes(currentAnswer)) {
      showError('Not in the word list', currentRow)
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
  <div class="relative h-screen w-screen flex flex-col bg-light-600 dark:bg-dark-900">
    <!-- Error messages -->
    <error-messages :errors="errors" />

    <!-- Modal
    <modal /> -->

    <!-- Header -->
    <div
      class="h-60px flex justify-between items-center bg-light-700 text-3xl font-semi-bold dark:(bg-dark-400 text-white)"
    >
      <div class="w-50px text-center" />
      <div>Wordle For Fun</div>
      <i
        :class="`w-50px p-2 text-center cursor-pointer 
        eva eva-${settings.darkMode ? 'sun-outline' : 'moon-outline'}`"
        @click="settings.darkMode = !settings.darkMode"
      />
    </div>

    <div class="flex flex-col flex-1 items-center justify-between">
      <div class="flex flex-1 items-center">
        <grid
          class="my-30px"
          :matrix="game.matrix"
          :current-row-idx="game.currentRowIdx"
          :word="word"
        />
      </div>
      <keyboard class="my-20px" :matrix="game.matrix" @press-key="onPressKey" />
    </div>
  </div>
</template>
