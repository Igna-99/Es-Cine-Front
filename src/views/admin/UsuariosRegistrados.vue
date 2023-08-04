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

        <div class="container_detalles margen1">

            <button class="elemento_flotante btn_basic" @click="navegar('menuAdministracion')">
                <i class="bi bi-arrow-left"></i> Regresar </button>

            <h1> <b> Usuarios Registrados </b> </h1>

        </div>

        <div v-for="usuario in this.UsuariosInDB">

            <div class="margen2">
                <ElementoListaUsuario :usuario="usuario" @recargar="cargarUsuarios" />
            </div>

        </div>

        <div>
            <div v-if="this.error" class="alert alert-danger" style="font-weight: bold;">
                {{ this.msjError }}
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import { usrStore } from '../../components/store/usrStore'
import ElementoListaUsuario from '../../components/ElementoListaUsuario.vue'


export default {
    data() {
        return {
            usrStore: usrStore(),

            UsuariosInDB: [],

            error: false,
            msjError: null,

        }
    },
    components: {
        ElementoListaUsuario,
    },
    async created() {

        document.title = "Usuarios Registrados";

        await this.cargarUsuarios();

    },
    methods: {
        navegar(ubicacion) {
            this.$router.push(`/${ubicacion}`);
        },

        async cargarUsuarios() {
            const url = 'http://localhost:8080/usuario/all';
            try {
                const response = await axios.get(url, { withCredentials: true });

                this.UsuariosInDB = response.data.result

            } catch (error) {
                this.error = true;
                this.msjError = error.response.data.message

                console.error(error)
            }

        },
    }

}

</script>



<style>
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
    min-width: 100%;
    z-index: 1;
    font-family: "Montserrat", sans-serif;
}

.container_detalles span {
    margin: 0px;
}

.container_detalles h1 {
    margin: 25px;
}

.margen1 {
    margin-bottom: 30px;
}

.margen2 {
    margin-top: 20px;
}


.resaltable:hover {
    background-color: rgba(170, 170, 170, 0.534);
    border-radius: 25px;
    cursor: pointer;
}
</style>