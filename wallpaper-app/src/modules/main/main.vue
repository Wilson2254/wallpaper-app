<script lang="ts">
import { ref, defineComponent  } from 'vue'
import axios from 'axios'
import WallPaperCard from  '../../components/WallPaperCard/WallPaperCard.vue'

export default defineComponent({
  setup() {
    let listOfPhotos = ref({})

    // expose to template and other options API hooks
    return {
      listOfPhotos
    }
  },

  mounted() {
    this.getWallPaper().then(photos => {
      this.listOfPhotos = photos
    })
  },

  methods: {
    async getWallPaper() : Promise<Object>  {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums/1/photos');
        return response.data;
      } catch (err) {
        console.log(err);
        return {}
      }
    }
  },

  components: {
    WallPaperCard
  }
})
</script>

<template>
  <div class="p-2 grid grid-cols-3 gap-x-4">
    <wall-paper-card v-for="photoItem in listOfPhotos" :key="photoItem.id"></wall-paper-card>
  </div>

</template>