import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import { createPinia } from 'pinia'

import './assets/main.css'

import App from "./App.vue"
import Index from "./components/Index.vue"
import Pelicula from "./components/Pelicula.vue"
import Welcome from "./components/TheWelcome.vue"



const routes = [
    { path : "/", component : Index},
    { path : "/pelicula", component : Pelicula}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const pinia = createPinia();


createApp(App).use(router).use(pinia).mount('#app')
