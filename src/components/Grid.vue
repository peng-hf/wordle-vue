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
  if (cell.reveal) return `${getCellBgColor(cell.state)} text-white`

  let styles = 'border-width-2 border-solid border-dark-100 text-black dark:(text-white)'
  if (cell.shake) styles += ' animate-shake'
  return styles
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
          `transition duration-150 ease-linear`,
          getCellColorClasses(cell)
        ]"
      >
        {{ cell.letter }}
      </div>
    </template>
  </div>
</template>


<style scoped>
.animate-shake {
  animation: shake 0.3s infinite;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  20%,
  60% {
    transform: translateX(-6px);
  }

  40%,
  80% {
    transform: translateX(6px);
  }
}
</style>