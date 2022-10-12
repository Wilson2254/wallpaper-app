<script setup lang="ts">
import {ref, onMounted} from 'vue'
import axios from 'axios'
import WallPaperCard from  '../../components/WallPaperCard/WallPaperCard.vue'

let listOfPhotos = ref({})

onMounted(() => {
  getWallPaper()
})

const fetchWallPaper = async () : Promise<Object>  => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/albums/1/photos');
    return response.data;
  } catch (err) {
    console.log(err);
    return {}
  }
}

const getWallPaper = async() : Promise<void> => {
  listOfPhotos.value = await fetchWallPaper()
}
</script>

<template>
  <div class="p-2 grid grid-cols-3 gap-x-4">
    <wall-paper-card v-for="photoItem in listOfPhotos" :key="photoItem.id" :img-source="photoItem.url"></wall-paper-card>
  </div>

</template>