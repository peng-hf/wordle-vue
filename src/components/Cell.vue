<script setup>
import { getCellBgRevealedColor } from '@/util'

defineProps({
  cell: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div :class="['h-62px w-62px perspect-200 relative', { 'animate-shake': cell.shake }]">
    <!-- Front face -->
    <div
      :class="[
        'face',
        'border-width-2 border-solid transform transition-transform duration-600',
        cell.letter ? 'border-dark-50 animate-zoom' : 'border-light-900 dark:(border-dark-300)',
        { 'rotate-x-180': cell.reveal }
      ]"
    >
      {{ cell.letter }}
    </div>

    <!-- Back face -->
    <div
      :class="[
        'face',
        'transform rotate-180 rotate-y-180 transform transition-transform duration-600',
        { 'rotate-x-180': cell.reveal },
        getCellBgRevealedColor(cell.state)
      ]"
    >
      {{ cell.letter }}
    </div>
  </div>
</template>

<style scoped>
.face {
  @apply absolute top-0 h-full w-full flex justify-center items-center backface-hidden rounded-sm text-30px uppercase font-bold dark:(text-white);
}
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
