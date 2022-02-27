<script setup>
defineProps(['grid'])
</script>

<template>
  <div class="inline-grid grid-cols-5 gap-6px">
    <template v-for="(_, row) in grid">
      <div
        v-for="(cell, idx) in grid[row]"
        :key="idx"
        class="h-62px w-62px flex justify-center items-center border-width-2 border-solid border-dark-100 rounded-md text-30px text-white uppercase font-bold"
      >
        {{ cell.letter }}
      </div>
    </template>
  </div>
</template>
