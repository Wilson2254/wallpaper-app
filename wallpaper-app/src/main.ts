import { createApp } from 'vue';
import './style.css';
import VueFullscreen from 'vue-fullscreen';
import { initializeApp } from 'firebase/app';
import { createWebHistory, createRouter } from 'vue-router';
import App from './App.vue';
import { store, key } from './store';
import routes from './navigation/routes';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyB-dok4VEXnYXNNyoLXjtRhKHSXOXAa5vs',
    authDomain: 'wall-paper-a9461.firebaseapp.com',
    projectId: 'wall-paper-a9461',
    storageBucket: 'wall-paper-a9461.appspot.com',
    messagingSenderId: '42843282561',
    appId: '1:42843282561:web:423031d4a3075adf600180',
};

// Initialize Firebase
const fireBase = initializeApp(firebaseConfig);

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

createApp(App).use(VueFullscreen).use(store, key).use(router).mount('#app');
export default fireBase;
