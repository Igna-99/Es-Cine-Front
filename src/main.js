import { createApp } from 'vue'
import { createRouter,createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import './assets/main.css'

import App from './App.vue'

import Home from './components/Home.vue'
import Pelicula from './components/Pelicula.vue'
import ReservaView from "./views/ReservaView.vue"
import loginUsuario from "./views/usr/loginUsuario.vue"
import DetallesUsuarioView from "./views/usr/DetallesUsuario.vue"
import PeliculaGenero from "./views/PeliculaGenero.vue"



const routes = [
    { path : "/", component : Home},
    { path : "/pelicula/:id", component : Pelicula},
    { path: "/reserva", component: ReservaView,},
    { path: "/login", component: loginUsuario,},
    { path: "/detallesUsuario/:id", component: DetallesUsuarioView,},
    { path: "/peliculasxgenero/:id", component: PeliculaGenero,},

]

const router = createRouter({
    history : createWebHistory(),
    routes
});

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app')


// import {createRouter, createWebHistory} from 'vue-router'
// 

// import './assets/main.css'

// import App from "./App.vue"
// import Index from "./components/Index.vue"
// import Pelicula from "./components/Pelicula.vue"



// const router = createRouter({
//     history: createWebHistory(),
//     routes
// })
    
// const pinia = createPinia();

// createApp(App).use(router).use(pinia).mount('#app')
