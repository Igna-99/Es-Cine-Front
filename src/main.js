import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import { createPinia } from 'pinia'

import './assets/main.css'

import App from "./App.vue"
import Index from "./components/Index.vue"
import Pelicula from "./components/Pelicula.vue"
import ReservaView from "./views/ReservaView.vue"
import UsuariosView from "./views/usr/Usuarios.vue"
import DetallesUsuarioView from "./views/usr/DetallesUsuario.vue"

const routes = [
    { path : "/", component : Index},
    { path : "/pelicula", component : Pelicula},
    { path: "/reserva", component: ReservaView,},
    { path: "/usuarios", component: UsuariosView,},
    { path: "/detallesUsuario/:id", component: DetallesUsuarioView,},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
    
const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app')
