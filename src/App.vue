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
        <grid class="my-30px" />
      </div>
      <keyboard class="my-20px" />
    </div>
  </div>
</template>

<style>
</style>
