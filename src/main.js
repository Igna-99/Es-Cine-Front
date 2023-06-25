import { createApp } from 'vue'
import { createRouter,createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import './assets/main.css'
import App from './App.vue'

import Home from './components/Home.vue'

//Usuario
import Registro from "./views/usr/RegistroUsuario.vue"
import loginUsuario from "./views/usr/loginUsuario.vue"
import DetallesUsuarioView from "./views/usr/DetallesUsuario.vue"
import ReservasUsuario from "./views/usr/ReservasUsuario.vue"

import Pelicula from './components/Pelicula.vue'
import ReservaView from "./views/ReservaView.vue"
import SalaView from "./views/SalaView.vue"

import PeliculaGenero from "./views/PeliculaGenero.vue"
import Peliculas from "./views/Peliculas.vue"


const routes = [

    { path : "/", component : Home},
    { path : "/login", component: loginUsuario,},
    { path : "/detallesUsuario", component: DetallesUsuarioView,},
    { path : "/reservasUsuario", component: ReservasUsuario,},

    { path : "/registro", component: Registro,},
    { path : "/pelicula/:id", component : Pelicula},
    { path : "/reserva", component: ReservaView,},
    { path : "/salas", component: SalaView,},
    { path : "/peliculasxgenero/:id", component: PeliculaGenero,},
    { path : "/Peliculas", component: Peliculas,},
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
