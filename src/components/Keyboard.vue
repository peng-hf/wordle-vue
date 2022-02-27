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
    <div v-for="(_, row) in keys" :key="row" class="flex justify-center">
      <div
        v-for="key in keys[row]"
        :key="key"
        :class="[
          'h-60px w-40px m-3px flex justify-center items-center gap-3px uppercase rounded-sm font-bold bg-light-100 text-lg dark:(bg-dark-200 text-white)',
          { '!w-80px !text-sm': key === 'Enter' || key === 'Escape' }
        ]"
      >
        {{ key }}
      </div>
    </div>
  </div>
</template>
