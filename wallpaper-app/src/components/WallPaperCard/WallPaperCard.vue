<script setup lang="ts">
import VLazyImage from "v-lazy-image"
import PreloaderBlock from "../../widgets/PreloaderBlock.vue"
import RadioPlayer from '../RadioPlayer/RadioPlayer.vue'
import {ref, Ref} from "vue";

interface Props {
  imgSource?: string
}

const props = withDefaults(defineProps<Props>(), {
  imgSource: '',
})

let isLoaded: Ref<boolean> = ref(false)
let isImageOpen: Ref<boolean> = ref(false)

</script>

<template>
  <div class="flex justify-center items-center cursor-pointer">
    <div v-if="!isLoaded" class="absolute">
      <preloader-block/>
    </div>
    <v-lazy-image
        @load="isLoaded = true"
        @click="isImageOpen = true"
        class="rounded-md object-cover h-80 w-full object-cover opacity-0 transition blur-md border-2 border-transparent hover:border-gray-400"
        :class="{'opacity-100 blur-0': isLoaded}" :src=props.imgSource
        v-show="!isImageOpen"
    />
    <fullscreen v-model="isImageOpen" class="flex justify-center" @change="isImageOpen = !isImageOpen">
      <Transition name="slide">
        <radio-player v-if="isImageOpen"/>
      </Transition>
      <img :src="props.imgSource" v-if="isImageOpen">
    </fullscreen>
  </div>
</template>

<style scoped>
.slide-enter-active {
  transition: all 0.2s ease-out;
}

.slide-leave-active {
  transition: all 0.2s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-50%) translateY(-100px);
  left: 50%;
}
</style>

