import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueFullscreen from 'vue-fullscreen'
import { store, key } from './store'


createApp(App).use(VueFullscreen).use(store, key).mount('#app')
