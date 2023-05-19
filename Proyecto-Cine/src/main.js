import { createApp } from 'vue'
import App from './App.vue'
import { createRouter,createWebHistory } from 'vue-router'
import './assets/main.css'

import Pelicula from './components/Pelicula.vue'
import Home from './components/Home.vue'

const routes =[
    {path : '/' , component : Home},
    {path : '/pelicula' , component : Pelicula},
]

const router = createRouter({
    history : createWebHistory(),
    routes
});

createApp(App).use(router).mount('#app')
