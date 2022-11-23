<script setup lang="ts">
import { ref } from 'vue';
import VLazyImage from 'v-lazy-image';
import PreloaderBlock from '../../widgets/PreloaderBlock.vue';
import RadioPlayer from '../RadioPlayer/RadioPlayer.vue';

interface Props {
    imgSource?: string;
}

const props = withDefaults(defineProps<Props>(), {
    imgSource: '',
});

const isLoaded = ref(false);
const isImageOpen = ref(false);
</script>

<template>
    <div class="flex justify-center items-center">
        <div v-if="!isLoaded" class="absolute">
            <preloader-block />
        </div>
        <v-lazy-image
            v-show="!isImageOpen"
            class="rounded-md object-cover h-80 w-full object-cover opacity-0 transition blur-md border-2 border-transparent hover:border-gray-400 cursor-pointer"
            :class="{ 'opacity-100 blur-0': isLoaded }"
            :src="props.imgSource"
            @click="isImageOpen = true"
            @load="isLoaded = true"
        />
        <fullscreen
            v-model="isImageOpen"
            class="flex justify-center"
            @change="isImageOpen = !isImageOpen"
        >
            <Transition name="slide">
                <radio-player v-if="isImageOpen" />
            </Transition>
            <img v-if="isImageOpen" :src="props.imgSource" />
        </fullscreen>
    </div>
</template>

<style scoped>
.slide-enter-active {
    transition: all 0.5s linear;
}

.slide-leave-active {
    transition: all 0.5s linear;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(-100px);
}
</style>
