<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { key } from '../../store';

const store = useStore(key);

const channelsList = store.getters.listOfRadioChannels;
const channelNumber = computed(() => store.getters.currentNumberChannel);
const isCanChange = ref(true);
const isChannelPlayed = ref(false);
const playerIsShow = ref(true);

const audioPlayer = ref({} as HTMLAudioElement);

const playOtherChannel = (value: number): void => {
    isCanChange.value = false;
    audioPlayer.value.pause();

    if (channelNumber.value + value < 0) {
        store.commit('setOtherNumberChannel', channelsList.length - 1);
    } else if (channelNumber.value + value > channelsList.length - 1) {
        store.commit('setOtherNumberChannel', 0);
    } else {
        store.commit('changeNumberChannel', value);
    }

    // TODO: Убрать костыль
    setTimeout(() => {
        audioPlayer.value.play();
        isCanChange.value = true;
        isChannelPlayed.value = true;
    }, 1000);
};

const playChannel = (): void => {
    audioPlayer.value.play();
    isChannelPlayed.value = true;
};

const pauseChannel = (): void => {
    audioPlayer.value.pause();
    isChannelPlayed.value = false;
};

const togglePlayer = (): void => {
    playerIsShow.value = !playerIsShow.value;
};
</script>

<template>
    <div
        class="max-w-md max-h-40 fixed top-4 rounded-md bg-gray-600 bg-opacity-50 z-10 left-4 p-2"
        :class="{ 'max-h-16 max-w-sm': !playerIsShow }"
    >
        <audio ref="audioPlayer" :src="channelsList[channelNumber].src" />
        <div class="flex items-center">
            <button
                class="hover:opacity-80 transition"
                :class="{
                    'opacity-20 pointer-events-none cursor-default':
                        isChannelPlayed,
                }"
                @click="playChannel"
            >
                <img
                    src="../../assets/play-button.svg"
                    alt="play-btn"
                    class="w-6 h-6"
                />
            </button>
            <button
                class="ml-4 hover:opacity-80 transition"
                :class="{
                    'opacity-20 pointer-events-none cursor-default':
                        !isChannelPlayed,
                }"
                @click="pauseChannel"
            >
                <img
                    src="../../assets/pause-btn.svg"
                    alt="pause-btn"
                    class="w-6 h-6"
                />
            </button>
            <button
                class="ml-4 hover:opacity-80 transition"
                :class="{
                    'opacity-20 pointer-events-none cursor-default':
                        !isCanChange,
                }"
                @click="playOtherChannel(-1)"
            >
                <img
                    src="../../assets/prev-btn.svg"
                    alt="next-btn"
                    class="w-6 h-6"
                />
            </button>
            <button
                class="ml-4 hover:opacity-80 transition"
                :class="{
                    'opacity-20 pointer-events-none cursor-default':
                        !isCanChange,
                }"
                @click="playOtherChannel(1)"
            >
                <img
                    src="../../assets/next-btn.svg"
                    alt="next-btn"
                    class="w-6 h-6"
                />
            </button>
            <button
                class="ml-4 hover:opacity-80 transition"
                @click="togglePlayer"
            >
                {{ playerIsShow ? 'Hide' : 'Show' }}
            </button>
        </div>
        <div v-if="playerIsShow" class="my-2">
            {{ channelsList[channelNumber].title }}
        </div>
        <div v-if="playerIsShow">
            {{ channelsList[channelNumber].desc }}
        </div>
    </div>
</template>
