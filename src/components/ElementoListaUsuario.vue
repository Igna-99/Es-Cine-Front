<template>
    <div class="container_basic container_flex">

        <div class="element">

            <div v-if="user.habilitado && user.idUsuario != this.usrStore.currentUser.idUsuario"
                class="container_icon icon_red resaltable" data-bs-toggle="modal"
                :data-bs-target="'#modalHabilitar' + user.idUsuario">
                <i class="bi bi-trash3-fill"></i>
            </div>
            <div v-else-if="!user.habilitado" class="container_icon icon_green resaltable" data-bs-toggle="modal"
                :data-bs-target="'#modalHabilitar' + user.idUsuario">
                <i class="bi bi-check"></i>
            </div>
            <div v-else-if="user.idUsuario == this.usrStore.currentUser.idUsuario" class="container_icon">
                <i class="bi bi-person-circle"></i>
            </div>

            <div class="large">
                {{ user.nombre }} {{ user.apellido }} | {{ user.email }} | {{ user.Rol.rol }}
            </div>

            <div class="small">
                {{ user.nombre }} {{ user.apellido }} | {{ user.Rol.rol }}
            </div>

            <div class="container_icon edit resaltable" data-bs-toggle="modal"
                :data-bs-target="'#modal' + user.idUsuario">
                <i class="bi bi-pencil-square"></i>
            </div>

        </div>

    </div>

    <!-- MODALS -->

    <!-- Habilitar Usuario -->
    <div v-if="user.idUsuario != this.usrStore.currentUser.idUsuario" class="modal fade"
        :id="'modalHabilitar' + user.idUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        data-bs-theme="dark">
        <div class="modal-dialog">
            <div class="modal-content text-light">

                <div class="modal-header ">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        <b v-if="user.habilitado"> Deshabilitar Usuario </b>
                        <b v-else-if="!user.habilitado"> Habilitar Usuario </b>
                    </h1>
                    <button :id="'btn_cerrar_habilitar' + user.idUsuario" type="button" class="btn-close"
                        data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>

                <div class="modal-body">
                    <span v-if="user.habilitado"> Deseas Deshabilitar la cuenta de este Usuario? </span>
                    <span v-else-if="!user.habilitado"> Deseas Habilitar la cuenta de este Usuario? </span>
                </div>

                <div class="modal-footer">
                    <button v-if="user.habilitado" type="button" class="btn btn-danger"
                        @click="disableUser(user.idUsuario)">
                        Deshabilitar </button>
                    <button v-else-if="!user.habilitado" type="button" class="btn btn-success"
                        @click="enableUser(user.idUsuario)"> Habilitar
                    </button>
                </div>

            </div>
        </div>
    </div>

    <!-- Detalles -->
    <div class="modal fade" :id="'modal' + user.idUsuario" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true" data-bs-theme="dark">
        <div class="modal-dialog">
            <div class="modal-content text-light">
                <div class="modal-header ">
                    <h1 v-if="user.idUsuario == this.usrStore.currentUser.idUsuario" class="modal-title fs-5"
                        id="exampleModalLabel"> <b> {{ user.nombre }} {{ user.apellido }} </b> (tu usuario)
                    </h1>
                    <h1 v-else-if="user.idUsuario != this.usrStore.currentUser.idUsuario" class="modal-title fs-5"
                        id="exampleModalLabel">
                        <b> {{ user.nombre }} {{ user.apellido }} </b>
                    </h1>
                    <button :id="'btn_cerrar_detalles_' + user.idUsuario" type="button" class="btn-close"
                        data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <b>ID de Usuario</b> {{ user.idUsuario }} <br>
                    <b>Email</b> {{ user.email }} <br>
                    <b>Rol</b> {{ user.Rol.rol }} <br>
                    <br>
                    <b v-if="!user.habilitado"> El Usuario se encuentra Inhabilitado </b>

                </div>
                <div class="modal-footer">

                    <button v-if="user.Rol.rol == 'admin' && user.idUsuario != this.usrStore.currentUser.idUsuario"
                        type="button" class="btn btn-danger" @click="removeAdminRole(user.idUsuario)">
                        Quitar Privilegios de Admin </button>

                    <button v-else-if="user.Rol.rol == 'user'" type="button" class="btn btn-success"
                        @click="grantAdminRole(user.idUsuario)">
                        Conceder Privilegios de Admin </button>

                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import axios from 'axios'
import { usrStore } from '../components/store/usrStore'

export default {
    data() {
        return {
            usrStore: usrStore()
        }
    },
    emits: ['reloadUsers'],
    props: ['user'],
    methods: {

        async enableUser(userId) {

            const url = 'http://localhost:8080/usuario/enableUser';
            const data = {
                idUsuario: userId
            };

            try {
                await axios.post(url, data, { withCredentials: true });

                alert("El Usuario A sido Habilitado Correctamente")

                document.getElementById('btn_cerrar_habilitar' + userId).click();
                this.$emit("reloadUsers");

            } catch (error) {
                console.log(error)
            }
        },

        async disableUser(userId) {

            const url = 'http://localhost:8080/usuario/disableUser';
            const data = {
                idUsuario: userId
            };

            try {
                await axios.post(url, data, { withCredentials: true });

                alert("El Usuario A sido Desabilitado Correctamente")

                document.getElementById('btn_cerrar_habilitar' + userId).click();
                this.$emit("reloadUsers");

            } catch (error) {
                console.log(error)
            }
        },

        async removeAdminRole(userId) {

            const url = 'http://localhost:8080/usuario/removeAdmin';
            const data = {
                idUsuario: userId
            };

            try {
                await axios.post(url, data, { withCredentials: true });

                alert("Rol De Administrador Revocado")

                document.getElementById('btn_cerrar_detalles_' + userId).click();
                this.$emit("reloadUsers");

            } catch (error) {
                console.log(error)
            }
        },

        async grantAdminRole(userId) {

            const url = 'http://localhost:8080/usuario/grantAdmin';
            const data = {
                idUsuario : userId
            };

            try {
                await axios.post(url, data, { withCredentials: true });

                alert("Rol De Administrador Concedido")

                document.getElementById('btn_cerrar_detalles_' + userId).click();
                this.$emit("reloadUsers");

            } catch (error) {
                console.log(error)
            }
        },

    },
}

</script>

<style scoped>
.container_basic {
    margin-top: 10px;
}

.container_icon {
    display: inline;
    font-size: 20px;
    padding: 13px 17px;
}

.element {
    display: flex;
    width: 100%;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    text-align: center;
}

.small {
    display: none;
}

@media screen and (max-width:1000px) {
    .large {
        display: none;
    }

    .small {
        display: inherit;
    }
}
</style>