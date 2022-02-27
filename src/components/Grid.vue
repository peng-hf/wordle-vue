<script setup>
import { ref } from 'vue'

const STATE = {
  EMPTY: 'EMPTY',
  CORRECT_SPOT: 'CORRECT_SPOT',
  WRONG_SPOT: 'WRONG_SPOT',
  NOT_PRESENT: 'NOT_PRESENT'
}

const grid = ref(
  Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => ({
      letter: '',
      state: STATE.EMPTY
    }))
  )
)
</script>

<template>
  <div class="inline-grid grid-cols-5 gap-6px">
    <template v-for="(_, row) in grid">
      <div
        v-for="(idx, tile) in grid[row]"
        :key="idx"
        class="h-62px w-62px border-width-2 border-solid border-dark-100 rounded-md"
      />
    </template>
  </div>
</template>
