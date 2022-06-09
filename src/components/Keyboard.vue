<script setup>
import { ref } from 'vue'
import { getCellBgColor } from '@/util'

const props = defineProps({
  matrix: {
    type: Array,
    required: true
  }
})

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

function getKeyColorClasses(key) {
  for (let i = props.matrix.length - 1; i >= 0; i--) {
    const row = props.matrix[i]
    const revealRow = row.every(c => c.reveal)
    const foundCell = row.find(c => c.letter === key)
    if (revealRow && foundCell?.reveal) {
      return `${getCellBgColor(foundCell.state)} text-white`
    }
  }
  return 'bg-light-800 dark:(bg-dark-50 text-white)'
}
</script>

<template>
  <div>
    <div v-for="(_, rowIdx) in keys" :key="rowIdx" class="flex justify-center">
      <div
        v-for="key in keys[rowIdx]"
        :key="key"
        :class="[
          'h-60px w-40px m-3px flex justify-center items-center gap-3px uppercase rounded-sm font-bold text-lg',
          { '!w-80px !text-sm': key === 'Enter' },
          { '!w-80px !text-3xl': key === 'Backspace' },
          getKeyColorClasses(key)
        ]"
        @click="handleKey(row, key)"
      >
        <i v-if="key === 'Backspace'" class="eva eva-backspace-outline" />
        <template v-else>{{ key }}</template>
      </div>
    </div>
  </div>
</template>
