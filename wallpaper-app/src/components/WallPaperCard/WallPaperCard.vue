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
      <img class="rounded-md" :src=props.imgSource alt="">
  </div>
</template>

<style scoped>
</style>
