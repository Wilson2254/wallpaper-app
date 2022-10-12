<script setup lang="ts">
interface Props {
  imgSource?: string
}

const props = withDefaults(defineProps<Props>(), {
  imgSource: '',
})
</script>

<template>
  <div>
      <img class="rounded-md object-cover h-80 w-full object-cover" :src=props.imgSource alt="img">
  </div>
</template>

<style scoped>
</style>
