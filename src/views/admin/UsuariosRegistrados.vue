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

            <button class="elemento_flotante btn_basic" @click="navigateTo('menuAdministracion')"> Regresar </button>
            <h1> <b> Usuarios Registrados </b> </h1>

        </div>

        <div v-if="!this.error" >
            <ElementoListaUsuario v-for="user in this.usersInDB" :user="user" @recargar="loadUsers" />
        </div>

        <div v-else="this.error" class="alert alert-danger">
            {{ this.msjError }}
        </div>

    </div>
</template>


<script>
import axios from 'axios'
import { usrStore } from '../../components/store/usrStore'

import ElementoListaUsuario from '../../components/ElementoListaUsuario.vue'
import { navigateTo } from '../../../utils/navigateTo'

export default {
    data() {
        return {
            usrStore: usrStore(),

            usersInDB: [],

            error: false,
            msjError: null,
        }
    },
    components: {
        ElementoListaUsuario,
    },
    async created() {

        document.title = "Usuarios Registrados";

        await this.loadUsers();
    },
    methods: {
        navigateTo,

        async loadUsers() {
            const url = 'http://localhost:8080/usuario/all';
            try {
                const response = await axios.get(url, { withCredentials: true });

                this.usersInDB = response.data.result

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

</style>