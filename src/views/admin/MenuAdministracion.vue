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

        <div class="container_basic">
            <button class="elemento_flotante btn_basic" @click="navegar('detallesUsuario')"> Regresar </button>
            <h1> <b> Administracion </b> </h1>
        </div>

        <div class="container_basic" style="margin-top: 20px;">

            <button class="btn_basic btn_menu_admin" @click="navegar('usuariosRegistrados')">Administrar Usuarios</button>

            <button class="btn_basic btn_menu_admin" @click="navegar('funcionesProgramadas')">Administrar Funciones</button>

            <button class="btn_basic btn_menu_admin" @click="">Administrar Peliculas</button>

        </div>

    </div>
</template>
  
  
    
<script>
import { usrStore } from '../../components/store/usrStore'

export default {
    data() {
        return {
            usrStore: usrStore()
        }
    },
    created() {

        document.title = "Administracion"

    },
    updated() {

    },
    methods: {

        navegar(ubicacion) {
            this.$router.push(`/${ubicacion}`);
        }

    },
}

</script>
  
  
<style scoped>

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