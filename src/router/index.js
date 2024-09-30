import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';

import RegistroUsuario from '../views/usuario/RegistroUsuario.vue';
import loginUsuario from '../views/usuario/LoginUsuario.vue';

import DetallesUsuarioView from '../views/usuario/DetallesUsuario.vue';
import ReservasUsuario from '../views/usuario/ReservasUsuario.vue';

import MenuAdministracion from '../views/admin/MenuAdministracion.vue';
import UsuariosRegistrados from '../views/admin/UsuariosRegistrados.vue'
import AdministrarFunciones from '../views/admin/AdministrarFunciones.vue';
import PeliculasEnCartelera from '../views/admin/PeliculasEnCartelera.vue';
import PeliculasPorEstrenar from '../views/admin/PeliculasPorEstrenar.vue';

import Promociones from '../views/Promociones.vue';
import Pelicula from '../views/peliculas/Pelicula.vue';
import Funcion from '../views/peliculas/Funcion.vue';

import PeliculaGenero from "../views/PeliculaGenero.vue";

const routes = [
    //------ cartelera
    {
        path: '/',
        redirect: '/cartelera'
    },
    {
        path: "/cartelera",
        name: "cartelera",
        component: Home
    },
    {
        path: "/cartelera/pelicula/:idPelicula",
        name: 'pelicula',
        component: Pelicula
    },
    {
        path: "/cartelera/funcion/:idFuncion",
        name: 'funcion',
        component: Funcion
    },

    //------ Promociones
    {
        path: "/promociones",
        name: 'promociones',
        component: Promociones,
    },

    //------ Registro
    {
        path: "/registro",
        name: 'registro',
        component: RegistroUsuario,
    },

    //------ login
    {
        path: "/login",
        name: 'login',
        component: loginUsuario,
    },

    //------ Reservas
    {
        path: "/reservas",
        name: 'reservas',
        component: ReservasUsuario,
    },

    //------ Usuario
    {
        path: "/usuario",
        name: 'usuario',
        component: DetallesUsuarioView,
    },

    //------ Admin (Usuario)

    {
        path: "/admin/menu",
        name: 'adminMenu',
        component: MenuAdministracion,
    },
    {
        path: "/admin/usuariosRegistrados",
        name: 'usuariosRegistrados',
        component: UsuariosRegistrados,
    },
    {
        path: "/admin/administrarFunciones",
        name: 'administrarFunciones',
        component: AdministrarFunciones,
    },
    {
        path: "/admin/peliculasEnCartelera",
        name: 'peliculasEnCartelera',
        component: PeliculasEnCartelera,
    },
    {
        path: "/admin/PeliculasPorEstrenar",
        name: 'PeliculasPorEstrenar',
        component: PeliculasPorEstrenar,
    },


    { path: "/peliculasxgenero/:id", component: PeliculaGenero, }, //to delete

];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 }

    }
});

export default router