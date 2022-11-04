<script setup lang="ts">
import {reactive, ref, Ref} from "vue";
import { useStore } from 'vuex'
import { key } from '../../store'

const store = useStore(key)

let channelsList = reactive(store.getters.listOfRadioChannels)
let channelNumber = ref(0)
let isCanChange = ref(true)
let isChannelPaused = ref(false)

let audioPlayer = ref({} as HTMLVideoElement )

const playOtherChannel = (value : number) : void => {
  isCanChange.value = false
  audioPlayer.value.pause();
  channelNumber.value +=value
  //TODO: Убрать костыль
  setTimeout(() => {
    audioPlayer.value.play()
    isCanChange.value = true
  }, 1000)
}

const playChannel = () : void => {
  audioPlayer.value.play();
  isChannelPaused.value = true
}

const pauseChannel = () : void => {
  audioPlayer.value.pause();
  isChannelPaused.value = false
}

</script>

<template>
    <div class="w-1/4 fixed top-4 rounded-md h-auto bg-emerald-700 bg-opacity-50 z-10 left-4 p-2">
      <audio :src="channelsList[channelNumber].src" ref="audioPlayer"/>
      <div>
        <button @click="playChannel" :class="{'opacity-20 pointer-events-none cursor-default': isChannelPaused}">
          <img src="../../assets/play-button.svg" alt="play-btn" class="w-6 h-6">
        </button>
        <button @click="pauseChannel" class="ml-4" :class="{'opacity-20 pointer-events-none cursor-default': !isChannelPaused}">
          <img src="../../assets/pause-btn.svg" alt="pause-btn" class="w-6 h-6" >
        </button>
        <button @click="playOtherChannel(-1)" class="ml-4" :class="{'opacity-20 pointer-events-none cursor-default': !isCanChange}">
          <img src="../../assets/prev-btn.svg" alt="next-btn" class="w-6 h-6">
        </button>
        <button @click="playOtherChannel(1)" class="ml-4" :class="{'opacity-20 pointer-events-none cursor-default': !isCanChange}">
          <img src="../../assets/next-btn.svg" alt="next-btn" class="w-6 h-6">
        </button>
      </div>
      <div class="my-2">
        {{channelsList[channelNumber].title}}
      </div>
      <div>
        {{channelsList[channelNumber].desc}}
      </div>
    </div>
</template>
