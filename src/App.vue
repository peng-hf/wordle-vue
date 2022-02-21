<script setup>
import { ref } from 'vue'

const darkMode = ref(true)

function toggleDarkMode() {
  darkMode.value = !darkMode.value
  document.body.classList.toggle('dark')
}


</script>

<template>
<div class="h-screen w-screen bg-light-500 dark:bg-dark-500">
  <!-- Header -->
  <div class="h-60px flex justify-between items-center text-3xl font-semi-bold dark:text-light-500">
    <div class="w-50px text-center"></div>
    <div>WORDLE</div>
    <i :class="`w-50px p-2 text-center cursor-pointer eva eva-${darkMode ? 'sun-outline' : 'moon-outline'}`" @click="toggleDarkMode"></i>
  </div>
  <hr class="border-gray-300 dark:border-gray-200" />
</div>
</template>

<style>

</style>
