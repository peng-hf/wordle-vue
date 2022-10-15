<script setup>
import Cell from './Cell.vue'

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
</script>

<template>
  <div class="inline-grid grid-cols-5 gap-6px">
    <template v-for="(_, rowIdx) in matrix">
      <cell v-for="(cell, columnIdx) in matrix[rowIdx]" :key="columnIdx" :cell="cell" />
    </template>
  </div>
</template>
