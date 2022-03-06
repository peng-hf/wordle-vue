<script setup>
import { ref, computed, watch } from 'vue'
import { allWords } from './util/words'
import { Cell, CELL_STATE } from './util'
import Grid from './components/Grid.vue'
import Keyboard from './components/Keyboard.vue'

const MAX_ATTEMPTS = 5

const darkMode = ref(true)
const word = 'hello'
const currentRowIdx = ref(0)
const grid = ref(
  // eslint-disable-next-line prettier-vue/prettier
  Array.from({ length: 6 }, () =>
    Array.from({ length: MAX_ATTEMPTS }, () => new Cell())
  )
)
const errors = ref([])

const currentAnswer = computed(() => {
  return grid.value[currentRowIdx.value].map(c => c.letter).join('')
})

function toggleDarkMode() {
  darkMode.value = !darkMode.value
  document.body.classList.toggle('dark')
}

function showError(msg) {
  const id = new Date().valueOf()
  errors.value.push({ msg, id })
  setTimeout(() => {
    errors.value = errors.value.filter(e => e.id !== id)
  }, 1200)
}

function onPressKey(key) {
  const currentRow = grid.value[currentRowIdx.value]
  if (key === 'Backspace') {
    let targetCell = null // Find cell to clear
    for (let i = currentRow.length - 1; i >= 0; --i) {
      const cell = currentRow[i]
      if (cell.state !== CELL_STATE.EMPTY) {
        targetCell = cell
        break
      }
    }
    if (targetCell) targetCell.clear()
  } else if (key === 'Enter') {
    if (currentAnswer.value === word) {
      console.log('WIN!')
    } else if (currentAnswer.value.length < word.length) {
      showError('Not enough letter')
    } else if (!allWords.includes(currentAnswer.value)) {
      showError('Not in the word list')
    } else {
      if (currentRowIdx.value + 1 < MAX_ATTEMPTS) currentRowIdx.value++
      else {
        console.log('GAME OVER!')
      }
    }
  } else {
    // Type a new letter
    let nextEmptyCellIdx
    const nextEmptyCell = currentRow.find((cell, idx) => {
      nextEmptyCellIdx = idx
      return cell.state === CELL_STATE.EMPTY
    }) // Find last empty cell and get its index

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
  <div
    class="relative h-screen w-screen flex flex-col bg-light-600 dark:bg-dark-900"
  >
    <div class="absolute h-full w-full flex flex-col top-1/6">
      <div
        v-for="(error, idx) in errors"
        :key="idx"
        class="bg-light-500 self-center py-10px px-20px rounded-sm font-bold mt-10px"
      >
        {{ error.msg }}
      </div>
    </div>

    <!-- Header -->
    <div
      class="h-60px flex justify-between items-center bg-light-700 text-3xl font-semi-bold dark:(bg-dark-400 text-light-50)"
    >
      <div class="w-50px text-center" />
      <div>Wordle For Fun</div>
      <i
        :class="`w-50px p-2 text-center cursor-pointer 
        eva eva-${darkMode ? 'sun-outline' : 'moon-outline'}`"
        @click="toggleDarkMode"
      />
    </div>

    <div class="flex flex-col flex-1 items-center justify-between">
      <div class="flex flex-1 items-center">
        <grid
          class="my-30px"
          :grid="grid"
          :current-row-idx="currentRowIdx"
          :word="word"
        />
      </div>
      <keyboard class="my-20px" @press-key="onPressKey" />
    </div>
  </div>
</template>

<style>
</style>
