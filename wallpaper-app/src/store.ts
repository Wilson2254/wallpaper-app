import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { fetchWallPaper, fetchRadioStation } from './api/RequestApi';

export interface State {
    wallPaperData: Object;
    RadioStationData: Array<Object>;
    currentNumberChannel: number;
    isGlobalPreloaderShow: boolean;
}

export const key: InjectionKey<Store<State>> = Symbol('');

export const store = createStore<State>({
    state: {
        wallPaperData: {},
        RadioStationData: [],
        currentNumberChannel: 0,
        isGlobalPreloaderShow: false,
    },
    actions: {
        async getWallPaper({ commit }) {
            commit('setWallPaper', await fetchWallPaper());
        },
        async getRadioStationChannels({ commit }) {
            commit('setRadioStationChannels', await fetchRadioStation());
        },
    },
    mutations: {
        setWallPaper(state, payload) {
            state.wallPaperData = payload;
        },
        setRadioStationChannels(state, payload) {
            const channels: Array<Object> = [];
            payload.channels.forEach((item) => {
                channels.push({
                    src: `https://ice1.somafm.com/${item.id}-128-mp3`,
                    title: item.title,
                    desc: item.description,
                });
            });
            state.RadioStationData = channels;
        },
        changeNumberChannel(state, payload) {
            state.currentNumberChannel += payload;
        },
        setOtherNumberChannel(state, payload) {
            state.currentNumberChannel = payload;
        },
        changeGlobalPreloader(state) {
            state.isGlobalPreloaderShow = !state.isGlobalPreloaderShow;
        },
    },
    getters: {
        listOfPhotos: (state) => state.wallPaperData,
        listOfRadioChannels: (state) => state.RadioStationData,
        currentNumberChannel: (state) => state.currentNumberChannel,
        getGlobalPreloaderState: (state) => state.isGlobalPreloaderShow,
    },
});
