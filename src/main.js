import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './assets/main.css';
import App from './App.vue';
import router from './router'
import VueAwesomePaginate from "vue-awesome-paginate";

import "vue-awesome-paginate/dist/style.css";

const pinia = createPinia();

createApp(App)
.use(pinia)
.use(router)
.use(VueAwesomePaginate)
.mount('#app');

