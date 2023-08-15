<template>
    <div v-if="!this.usrStore.isLogged" class="container_borde borde_doble">
        <div class="container_basic">
            <h1>no estas logeado</h1>
        </div>
    </div>

    <div v-else-if="!this.usrStore.isAdmin" class="container_borde borde_doble">
        <div class="container_basic">
            <h1>Acesso Denegado</h1>
        </div>
    </div>

    <div v-else class="borde_doble tamaño_xs">

        <div class="container_basic header">
            <button class="elemento_flotante btn_basic" @click="navigateTo('detallesUsuario')"> Regresar </button>
            <h1> <b> Administracion </b> </h1>
        </div>

        <div class="container_basic ">

            <button class="btn_basic btn_menu_admin" @click="navigateTo('usuariosRegistrados')">Administrar Usuarios</button>

            <button class="btn_basic btn_menu_admin" @click="navigateTo('funcionesProgramadas')">Administrar Funciones</button>

            <button class="btn_basic btn_menu_admin" @click="navigateTo('peliculasEnCartelera')">Administrar Peliculas</button>

        </div>

    </div>
</template>
  
<script>
import { usrStore } from '../../components/store/usrStore'

import { navigateTo } from '../../../utils/navigateTo'

export default {
    data() {
        return {
            usrStore: usrStore()
        }
    },
    created() {
        document.title = "Administracion"

    },
    methods: {
        navigateTo,
    },
}

</script>
  
<style scoped>

.header {
    margin-bottom: 20px;
}
.container_basic h1 {
    margin-top: 35px;
}
.container_basic span {
    margin: 0px;
}

.btn_menu_admin {
    width: 95%;
    height: 60px;
}

.btn_menu_admin:before {
    width: 50%;
}
</style>