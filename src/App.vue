<script setup>
import { ref } from 'vue'
import Grid from './components/Grid.vue'
import Keyboard from './components/Keyboard.vue'

const darkMode = ref(true)

function toggleDarkMode() {
  darkMode.value = !darkMode.value
  document.body.classList.toggle('dark')
}
</script>

<template>
  <div class="h-screen w-screen bg-light-600 dark:bg-dark-900">
    <!-- Header -->
    <div
      class="h-60px flex justify-between items-center bg-gray-300 text-3xl font-semi-bold dark:(bg-dark-400 text-light-50)"
    >
      <div class="w-50px text-center" />
      <div>WORDLE</div>
      <i
        :class="`w-50px p-2 text-center cursor-pointer eva eva-${
          darkMode ? 'sun-outline' : 'moon-outline'
        }`"
        @click="toggleDarkMode"
      />
    </div>

    <div class="flex justify-center">
      <grid />
    </div>

    <div class="flex justify-center">
      <keyboard />
    </div>
  </div>
</template>

<style>
</style>
