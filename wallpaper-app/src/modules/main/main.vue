<script setup lang="ts">
import { onMounted } from 'vue'
import WallPaperCard from  '../../components/WallPaperCard/WallPaperCard.vue'

const getWallPaper = () : void => {
  console.log('Send request')
}

onMounted(() => {
  getWallPaper()
})

</script>
<template>
  <div class="p-2 flex gap-x-2">
    <wall-paper-card class="w-4/12"></wall-paper-card>
  </div>

</template>