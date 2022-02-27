<script setup>
import { ref } from 'vue'
import { Cell, CELL_STATE } from './utils.js'
import Grid from './components/Grid.vue'
import Keyboard from './components/Keyboard.vue'

const darkMode = ref(true)
const currentRowIdx = ref(0)
const grid = ref(
  // eslint-disable-next-line prettier-vue/prettier
  Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => new Cell())
  )
)

function toggleDarkMode() {
  darkMode.value = !darkMode.value
  document.body.classList.toggle('dark')
}

function onPressKey(key) {
  const currentRow = grid.value[currentRowIdx.value]
  if (key === 'Backspace') {
    let targetCell = null // find cell to clear
    for (let i = currentRow.length - 1; i >= 0; --i) {
      const cell = currentRow[i]
      if (cell.state !== CELL_STATE.EMPTY) {
        targetCell = cell
        break
      }
    }
    if (targetCell) targetCell.clear()
  } else {
    const nextEmptyCell = currentRow.find(
      cell => cell.state === CELL_STATE.EMPTY
    ) // Find last empty cell
    // console.log(currentRow)
    // console.log(nextEmptyCell)
    // console.log(key)

    if (nextEmptyCell) {
      nextEmptyCell.letter = key
      // TODO: Compute cell state
      nextEmptyCell.state = CELL_STATE.CORRECT
    }
  }
}
</script>

<template>
  <div class="h-screen w-screen flex flex-col bg-light-600 dark:bg-dark-900">
    <!-- Header -->
    <div
      class="h-60px flex justify-between items-center bg-light-700 text-3xl font-semi-bold dark:(bg-dark-400 text-light-50)"
    >
      <div class="w-50px text-center" />
      <div>WORDLE</div>
      <i
        :class="`w-50px p-2 text-center cursor-pointer 
        eva eva-${darkMode ? 'sun-outline' : 'moon-outline'}`"
        @click="toggleDarkMode"
      />
    </div>

    <div class="flex flex-col flex-1 items-center justify-between">
      <div class="flex flex-1 items-center">
        <grid class="my-30px" :grid="grid" />
      </div>
      <keyboard class="my-20px" @press-key="onPressKey" />
    </div>
  </div>
</template>

<style>
</style>
