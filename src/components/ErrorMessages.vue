<script setup>
const props = defineProps({
  errors: {
    type: Array,
    default: () => []
  }
})

console.log(props.errors)
</script>


<template>
  <div class="absolute w-full flex flex-col pt-1/6">
    <div
      v-for="(error, idx) in errors"
      :key="idx"
      class="self-center py-10px px-20px rounded-sm font-bold mt-10px bg-dark-400 text-white dark:(bg-light-400 text-black) z-1"
    >
      {{ error.msg }}
    </div>
  </div>
</template>


