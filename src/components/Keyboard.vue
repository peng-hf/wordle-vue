<script setup>
import { ref } from 'vue'

const emit = defineEmits(['pressKey'])

document.addEventListener('keydown', handleKey)

const KEYS = [
  [...'qwertyuiop'.split('')],
  [...'asdfghjkl'.split('')],
  ['Enter', ...'zxcvbnm'.split(''), 'Backspace']
]

const keys = ref(KEYS)

const ALLOWED_KEYS = KEYS.reduce((acc, row) => acc.concat(row), [])
function handleKey(evt) {
  const key = evt instanceof KeyboardEvent ? evt.key : evt
  if (ALLOWED_KEYS.includes(key)) emit('pressKey', key)
}
</script>

<template>
  <div>
    <div v-for="(_, row) in keys" :key="row" class="flex justify-center">
      <div
        v-for="key in keys[row]"
        :key="key"
        :class="[
          'h-60px w-40px m-3px flex justify-center items-center gap-3px uppercase rounded-sm font-bold bg-light-100 text-lg dark:(bg-dark-200 text-white)',
          { '!w-80px !text-sm': key === 'Enter' || key === 'Backspace' }
        ]"
        @click="handleKey(key)"
      >
        {{ key }}
      </div>
    </div>
  </div>
</template>
