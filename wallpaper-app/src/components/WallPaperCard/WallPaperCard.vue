<script setup lang="ts">
interface Props {
  msg?: string
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
})
</script>

<template>
  <div>
    {{props.msg}}
      <img class="rounded-md" src="https://placehold.jp/1920x900.png" alt="">
  </div>
</template>

<style scoped>
</style>
