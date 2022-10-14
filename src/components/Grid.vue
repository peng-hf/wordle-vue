<script setup>
import { getCellBgRevealedColor } from '@/util'

defineProps({
  matrix: {
    type: Array,
    required: true
  },
  currentRowIdx: {
    type: Number,
    required: true
  },
  word: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="inline-grid grid-cols-5 gap-6px">
    <template v-for="(_, rowIdx) in matrix">
      <!-- Scene -->
      <div
        v-for="(cell, columnIdx) in matrix[rowIdx]"
        :key="columnIdx"
        class="h-62px w-62px perspect-200"
      >
        <!-- Object -->
        <div
          :class="[
            'h-full w-full relative preserve-3d transition-transform transform duration-500',
            { 'rotate-x-180': cell.reveal },
            { 'animate-shake': cell.shake }
          ]"
        >
          <!-- Front face -->
          <div
            :class="[
              'absolute top-0 h-full w-full flex justify-center items-center rounded-sm text-30px uppercase font-bold backface-hidden',
              'border-width-2 border-solid text-black dark:(text-white)',
              cell.letter
                ? ' border-dark-50 animate-zoom'
                : ' border-light-900 dark:(border-dark-300)'
            ]"
          >
            {{ cell.letter }}
          </div>

          <!-- Back face -->
          <div
            :class="[
              'absolute top-0 h-full w-full flex justify-center items-center rounded-sm text-30px uppercase font-bold backface-hidden',
              'transform rotate-y-180 rotate-180',
              getCellBgRevealedColor(cell.state),
              'text-white'
            ]"
          >
            {{ cell.letter }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>


<style scoped>
.animate-shake {
  animation: shake 0.3s infinite;
}

.animate-zoom {
  animation: zoom 0.5s;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  20%,
  60% {
    transform: translateX(-5px);
  }

  40%,
  80% {
    transform: translateX(5px);
  }
}

@keyframes zoom {
  0% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>