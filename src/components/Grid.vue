<script setup>
import { CELL_STATE } from '@/utils.js'
defineProps(['grid', 'currentRowIdx', 'word'])
</script>

<template>
  <div class="inline-grid grid-cols-5 gap-6px">
    <template v-for="(_, rowIdx) in grid">
      <div
        v-for="(cell, columnIdx) in grid[rowIdx]"
        :key="columnIdx"
        :class="[
          'h-62px w-62px flex justify-center items-center rounded-md text-30px text-white uppercase font-bold',
          {
            'border-width-2 border-solid border-dark-100 ':
              cell.state === CELL_STATE.EMPTY
          },
          { 'bg-lime-600': cell.state === CELL_STATE.CORRECT },
          { 'bg-orange-500': cell.state === CELL_STATE.PRESENT },
          { 'bg-dark-100': cell.state === CELL_STATE.ABSENT }
        ]"
      >
        {{ cell.letter }}
      </div>
    </template>
  </div>
</template>
