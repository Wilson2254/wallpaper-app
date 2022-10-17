import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VueFullscreen from 'vue-fullscreen'


createApp(App).use(VueFullscreen).mount('#app')
