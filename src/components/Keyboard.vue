<script setup>
import { ref } from 'vue'

const keys = ref([
  [...'qwertyuiop'.split('')],
  [...'asdfghjkl'.split('')],
  ['Enter', ...'zxcvbnm'.split(''), 'Escape']
])

console.log(keys.value)
</script>

<template>
  <div>
    <div v-for="(_, idx) in keys" :key="idx" class="flex justify-center">
      <div
        v-for="key in keys[idx]"
        :key="key"
        :class="[
          'h-60px w-40px m-3px flex justify-center items-center gap-3px bg-light-500 uppercase rounded-sm font-bold',
          { '!w-80px': key === 'Enter' || key === 'Escape' }
        ]"
      >
        {{ key }}
      </div>
    </div>
  </div>
</template>
