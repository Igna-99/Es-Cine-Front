import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from 'vue-router'

import App from "./App.vue"
import Index from "./components/Index.vue"
import './assets/main.css'


import Pelicula from "./components/Pelicula.vue"
import Welcome from "./components/TheWelcome.vue"
import { createPinia } from 'pinia'



const routes = [
    { path : "/", component : Index},
    { path : "/pelicula", component : Pelicula}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const pinia = createPinia();


createApp(App).use(pinia).use(router).mount('#app')
