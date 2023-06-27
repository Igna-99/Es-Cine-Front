import { createApp } from 'vue'
import { createRouter,createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import './assets/main.css'
import App from './App.vue'

import Home from './components/Home.vue'

//Usuario
import RegistroUsuario from "./views/usuario/RegistroUsuario.vue"
import loginUsuario from "./views/usuario/loginUsuario.vue"
import DetallesUsuarioView from "./views/usuario/DetallesUsuario.vue"
import ReservasUsuario from "./views/usuario/ReservasUsuario.vue"

import Cartelera from "./views/Cartelera.vue"
import Pelicula from './components/Pelicula.vue'
import FuncionesDePelicula from './views/FuncionesDePelicula.vue'

import ReservaView from "./views/ReservaView.vue"
import SalaView from "./views/SalaView.vue"

import PeliculaGenero from "./views/PeliculaGenero.vue"



const routes = [

    { path : "/", component : Home},
    { path : "/registro", component: RegistroUsuario,},
    { path : "/login", component: loginUsuario,},
    { path : "/detallesUsuario", component: DetallesUsuarioView,},
    { path : "/reservasUsuario", component: ReservasUsuario,},
    
    { path : "/cartelera", component: Cartelera,},
    { path : "/pelicula/:id", component : Pelicula},
    { path : "/funciones/:idPelicula", component : FuncionesDePelicula },

    { path : "/reserva", component: ReservaView,},
    { path : "/reserva/:sala/:horario/:idPelicula", component: ReservaView,},
    { path : "/salas", component: SalaView,},

    { path : "/peliculasxgenero/:id", component: PeliculaGenero,},

]

const router = createRouter({
    history : createWebHistory(),
    routes
});

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app');

