import { createApp } from 'vue';
import './style.css';
import VueFullscreen from 'vue-fullscreen';
import App from './App.vue';
import { store, key } from './store';

createApp(App).use(VueFullscreen).use(store, key).mount('#app');
