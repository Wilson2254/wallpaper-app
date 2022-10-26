<script setup lang="ts">
import {ref, onMounted} from 'vue'
import axios from 'axios'
import WallPaperCard from '../../components/WallPaperCard/WallPaperCard.vue'

let listOfPhotos = ref({})
let listOfRadioStation = ref({})

onMounted(() => {
  getWallPaper()
  getRadioStation()
})

const fetchWallPaper = async (): Promise<Object> => {
  try {
    const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=16');
    return response.data;
  } catch (err) {
    console.log(err);
    return {}
  }
}

const fetchRadioStation = async (): Promise<Object> => {
  try {
    const response = await axios.get('https://somafm.com/channels.json');
    return response.data;
  } catch (err) {
    console.log(err);
    return {}
  }
}

const getWallPaper = async (): Promise<void> => {
  listOfPhotos.value = await fetchWallPaper()
}

const getRadioStation = async (): Promise<void> => {
  listOfRadioStation.value = await fetchRadioStation()
}

</script>

<template>
  <div class="p-4 grid grid-cols-4 gap-4">
    <wall-paper-card v-for="photoItem in listOfPhotos" :key="photoItem.id"
                     :img-source="photoItem.download_url">
    </wall-paper-card>
  </div>

</template>