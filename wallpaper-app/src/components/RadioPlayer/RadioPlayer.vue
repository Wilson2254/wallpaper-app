<script setup lang="ts">
import {reactive, ref, Ref} from "vue";
import { useStore } from 'vuex'
import { key } from '../../store'

const store = useStore(key)

let channelsList = reactive(store.getters.listOfRadioChannels)
let channelNumber: Ref<number> = ref(0)

const audioPlayer = ref(null);

const playNextChannel = () : void => {}
</script>

<template>
    <div class="w-1/2 fixed top-4 rounded-md h-20 bg-emerald-700 z-10 left-1/2 -translate-x-1/2">
      <audio :src="channelsList[channelNumber]" ref="audioPlayer"/>
      <button @click="$refs.audioPlayer.play()" class="border-black border-2">
        Play
      </button>
      <button @click="$refs.audioPlayer.pause()" class="border-black border-2">
        Stop
      </button>
      <button @click="playNextChannel" class="border-black border-2">
        Next
      </button>
    </div>
</template>
