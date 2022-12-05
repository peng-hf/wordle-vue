<script>
import { getCellBgRevealedColor } from '@/util'

const KEYS = [
  [...'qwertyuiop'.split('')],
  [...'asdfghjkl'.split('')],
  ['Enter', ...'zxcvbnm'.split(''), 'Backspace']
]
const ALLOWED_KEYS = KEYS.reduce((acc, row) => acc.concat(row), [])

export default {
  props: {
    matrix: {
      type: Array,
      required: true
    }
  },
  emits: ['pressKey', 'restart'],
  data: () => ({
    KEYS
  }),
  mounted() {
    const mapKeyToElt = ALLOWED_KEYS.reduce((acc, key) => {
      const elt = document.querySelector(`#key-${key}`)
      acc[key] = elt
      return acc
    }, {})

    document.addEventListener('keydown', evt => {
      if (ALLOWED_KEYS.includes(evt.key)) {
        this.$emit('pressKey', evt.key)
        const keyElt = mapKeyToElt[evt.key]
        keyElt.classList.add('opacity-70')
      }
      if (evt.shiftKey && evt.key === 'R') this.$emit('restart')
    })

    document.addEventListener('keyup', evt => {
      const keyElt = mapKeyToElt[evt.key]
      console.log(keyElt)
      if (keyElt) keyElt.classList.remove('opacity-70')
    })
  },
  methods: {
    onClickKey(key) {
      if (ALLOWED_KEYS.includes(key)) this.$emit('pressKey', key)
    },
    getKeyColorClasses(key) {
      for (let i = this.matrix.length - 1; i >= 0; i--) {
        const row = this.matrix[i]
        const foundCell = row.find(c => c.letter === key)
        if (foundCell?.reveal) {
          return `${getCellBgRevealedColor(foundCell.state)} text-white`
        }
      }
      return 'bg-light-800 dark:(bg-dark-50 text-white) hover:opacity-70 active:opacity-40'
    }
  }
}
</script>

<template>
  <div>
    <div v-for="(_, rowIdx) in KEYS" :key="rowIdx" class="flex justify-center">
      <div
        v-for="key in KEYS[rowIdx]"
        :id="`key-${key}`"
        :key="key"
        :class="[
          'h-60px w-40px m-3px flex justify-center items-center gap-3px uppercase rounded-sm font-bold text-lg cursor-pointer',
          { '!w-80px !text-sm': key === 'Enter' },
          { '!w-80px !text-3xl': key === 'Backspace' },
          getKeyColorClasses(key)
        ]"
        @click="onClickKey(key)"
      >
        <i v-if="key === 'Backspace'" class="eva eva-backspace-outline" />
        <template v-else>{{ key }}</template>
      </div>
    </div>
  </div>
</template>
