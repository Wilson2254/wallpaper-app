import {InjectionKey} from 'vue'
import { createStore, Store } from 'vuex'
import {fetchWallPaper, fetchRadioStation} from './api/RequestApi'

export interface State {
    wallPaperData : Object,
    RadioStationData: Array <String>
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        wallPaperData: {},
        RadioStationData: []
    },
    actions: {
        async getWallPaper({ commit }){
            commit('setWallPaper', await fetchWallPaper())
        },
        async getRadioStationChannels({ commit }){
            commit('setRadioStationChannels', await fetchRadioStation())
        }
    },
    mutations: {
        setWallPaper(state, payload) {
            state.wallPaperData = payload
        },
        setRadioStationChannels(state, payload){
            let channels : Array<String> = []
            payload.channels.forEach((item) => {
                channels.push(`https://ice1.somafm.com/${item.id}-128-mp3`)
            })
            state.RadioStationData = channels
        }
    },
    getters: {
        listOfPhotos: (state) => state.wallPaperData,
        listOfRadioChannels: (state) => state.RadioStationData
    }
})