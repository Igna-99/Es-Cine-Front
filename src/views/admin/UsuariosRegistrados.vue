<template>
    <div v-if="!this.usrStore.isLogged" class="borde_doble">
        <div class="container_basic">
            <h1>no estas logeado</h1>
        </div>
    </div>

    <div v-else-if="!this.usrStore.isAdmin" class="borde_doble">
        <div class="container_basic">
            <h1>Acesso Denegado</h1>
        </div>
    </div>

    <div v-else class="borde_doble tamaño_l">

        <div class="container_basic">

            <button class="elemento_flotante btn_basic" @click="navegar('menuAdministracion')"> Regresar </button>

            <h1> <b> Usuarios Registrados </b> </h1>

        </div>

        <div v-for="usuario in this.UsuariosInDB">

            <div class="elemento_usuario">
                <ElementoListaUsuario :usuario="usuario" @recargar="cargarUsuarios" />
            </div>

        </div>

        <div>
            <div v-if="this.error" class="alert alert-danger">
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

<style scoped>
.container_basic {
    padding: 30px 80px;
    margin-bottom: 20px;
}
.container_basic span {
    margin: 0px;
}
.container_basic h1 {
  margin-top: 35px;
}
.elemento_usuario {
    margin-top: 15px;
}

.resaltable:hover {
    background-color: rgba(170, 170, 170, 0.534);
    border-radius: 25px;
    cursor: pointer;
}
</style>