<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import WallPaperCard from '../../components/WallPaperCard/WallPaperCard.vue';
import { key } from '../../store';

const store = useStore(key);

const listOfPhotos = ref({});

const getWallPaper = async (): Promise<void> => {
    await store.dispatch('getWallPaper');
    listOfPhotos.value = store.getters.listOfPhotos;
};

const getRadioStationChannels = async (): Promise<void> => {
    await store.dispatch('getRadioStationChannels');
};

getWallPaper();
getRadioStationChannels();
</script>

<template>
    <router-link
        :to="{ name: 'Authentication' }"
        class="px-4 pt-4 flex justify-end"
    >
        Authentication
    </router-link>
    <div class="p-4 grid grid-cols-4 gap-4">
        <wall-paper-card
            v-for="photoItem in listOfPhotos"
            :key="photoItem.id"
            :img-source="photoItem.download_url"
        >
        </wall-paper-card>
    </div>
</template>
