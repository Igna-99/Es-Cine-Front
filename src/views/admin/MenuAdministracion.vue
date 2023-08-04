<template>
    <div v-if="!this.usrStore.isLogged" class="container_borde borde_doble">
        <div class="container_detalles">
            <h1>no estas logeado</h1>
        </div>
    </div>

    <div v-else-if="!this.usrStore.isAdmin" class="container_borde borde_doble">
        <div class="container_detalles">
            <h1>Acesso Denegado</h1>
        </div>
    </div>

    <div v-else class="container_borde borde_doble">

        <div class="container_detalles">
            <button class="elemento_flotante btn_basic" @click="navegar('detallesUsuario')"> Regresar </button>
            <h1> <b> Administracion </b> </h1>
        </div>

        <div class="container_detalles" style="margin-top: 20px;">

            <button class="btn_basic opcion" @click="navegar('usuariosRegistrados')">Administrar Usuarios</button>

            <button class="btn_basic opcion" @click="navegar('funcionesProgramadas')">Administrar Funciones</button>

            <button class="btn_basic opcion" @click="">Administrar Peliculas</button>

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
.container_detalles {
    gap: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    padding: 30px 80px;
    position: relative;
    color: #fff;
    background-color: #202020;
    overflow: hidden;
    max-width: 100%;
    z-index: 1;
    font-family: "Montserrat", sans-serif;
}

.container_detalles span {
    margin: 0px;
}

.container_detalles h1 {
    margin: 25px;
}

.opcion {
    width: 90%;
    height: 60px;
}

.opcion:before {
    width: 50%;
}
</style>