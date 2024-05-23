import "bootstrap/dist/css/bootstrap.css"

import { createApp } from 'vue';
import { createRouter,createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import './assets/main.css';
import App from './App.vue';

import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";


//rutas

import Home from './views/Home.vue';

import RegistroUsuario from './views/usuario/RegistroUsuario.vue';
import loginUsuario from './views/usuario/loginUsuario.vue';

import DetallesUsuarioView from './views/usuario/DetallesUsuario.vue';
import ReservasUsuario from './views/usuario/ReservasUsuario.vue';

import MenuAdministracion from './views/admin/MenuAdministracion.vue';
import UsuariosRegistrados from './views/admin/UsuariosRegistrados.vue'
import FuncionesProgramadas from './views/admin/FuncionesProgramadas.vue';
import ProgramarFunciones from './views/admin/ProgramarFunciones.vue';
import PeliculasEnCartelera from './views/admin/PeliculasEnCartelera.vue';
import CargarPelicula from './views/admin/CargarPelicula.vue';

import Promociones from './views/Promociones.vue';
import Pelicula from './views/peliculas/Pelicula.vue';
import Funcion from './views/peliculas/Funcion.vue';

import PeliculaGenero from "./views/PeliculaGenero.vue";



const routes = [

    { path : "/", component : Home},

    { path : "/registro", component: RegistroUsuario,},
    { path : "/login", component: loginUsuario,},

    { path : "/detallesUsuario", component: DetallesUsuarioView,},
    { path : "/reservasUsuario", component: ReservasUsuario,},

    { path : "/menuAdministracion", component: MenuAdministracion,},
    { path : "/usuariosRegistrados", component: UsuariosRegistrados,},
    { path : "/funcionesProgramadas", component: FuncionesProgramadas,},
    { path : "/programarFunciones", component: ProgramarFunciones,},
    { path : "/peliculasEnCartelera", component: PeliculasEnCartelera,},
    { path : "/cargarPelicula", component: CargarPelicula,},

    { path : "/promociones", component: Promociones,},
    { path : "/pelicula/:idPelicula", component : Pelicula},
    { path : "/funcion/:idFuncion", component : Funcion},

    { path : "/peliculasxgenero/:id", component: PeliculaGenero,},

];

const router = createRouter({
    history : createWebHistory(),
    routes
});

const pinia = createPinia();

createApp(App)
.use(pinia)
.use(router)
.use(VueAwesomePaginate)
.mount('#app');

import "bootstrap/dist/js/bootstrap.js"

