<script setup>
import { getCellBgColor } from '@/util'

defineProps({
  matrix: {
    type: Array,
    required: true
  },
  currentRowIdx: {
    type: Number,
    required: true
  },
  word: {
    type: String,
    required: true
  }
})

function getCellColorClasses(cell) {
  const classes =
    'border-width-2 border-solid border-dark-100 text-black dark:(text-white)' // CELL_STATE.EMPTY
  if (cell.reveal) return `${getCellBgColor(cell.state)} text-white`
  return classes
}
</script>

<template>
  <div class="inline-grid grid-cols-5 gap-6px">
    <template v-for="(_, rowIdx) in matrix">
      <div
        v-for="(cell, columnIdx) in matrix[rowIdx]"
        :key="columnIdx"
        :class="[
          'h-62px w-62px flex justify-center items-center rounded-sm text-30px uppercase font-bold ',
          'transition duration-150 ease-linear',
          getCellColorClasses(cell)
        ]"
      >
        {{ cell.letter }}
      </div>
    </template>
  </div>
</template>
