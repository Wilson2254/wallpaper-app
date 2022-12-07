import MainPage from '../modules/main/MainModule.vue';
import AuthenticationPage from '../modules/authentication/AuthenticationModule.vue';

const routes = [
    { path: '/', component: MainPage, name: 'Main', label: 'Home' },
    { path: '/auth', component: AuthenticationPage, name: 'Authentication', label: 'Authentication' },
];

export default routes;
