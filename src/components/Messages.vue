<script setup>
defineProps({
  messages: {
    type: Array,
    default: () => []
  }
})
</script>


<template>
  <div class="absolute w-full flex flex-col pt-1/5 items-center">
    <div
      v-for="(msg, idx) in messages"
      :key="idx"
      class="py-12px px-20px rounded-md mt-10px bg-light-400 text-black text-center shadow-lg z-1"
    >
      <span v-html="msg.text" />
    </div>
  </div>
</template>


