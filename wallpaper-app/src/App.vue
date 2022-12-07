<script setup lang="ts">
import { useStore } from 'vuex';
import { computed } from 'vue';
import routes from './navigation/routes';
import { key } from './store';
import PreloaderBlock from './widgets/PreloaderBlock.vue';

const store = useStore(key);

const globalPreloaderShow = computed(() => store.getters.getGlobalPreloaderState);
</script>

<template>
    <div>
        <div v-if="globalPreloaderShow" class="z-10 flex fixed w-screen h-screen justify-center items-center bg-gray-500 bg-opacity-80">
            <PreloaderBlock />
        </div>

        <div class="flex px-4 pt-4 gap-x-4">
            <router-link v-for="(route, index) in routes" :key="index" :to="{ name: route.name }"> {{ route.label }} </router-link>
        </div>

        <router-view v-slot="{ Component, route }">
            <transition name="scale" mode="out-in">
                <div :key="route.name">
                    <component :is="Component"></component>
                </div>
            </transition>
        </router-view>
    </div>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
    transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>
