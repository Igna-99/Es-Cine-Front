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
        capitalizeFirstLetter(string) {
            if (string) {
                string = string.charAt(0).toUpperCase() + string.slice(1);
            }
            return string;
        },
        async enableUser(userId) {
            const url = 'http://localhost:8080/usuario/enableUser';
            const data = {
                idUsuario: userId
            };
            try {
                document.getElementById('btn_cerrar_habilitar' + userId).click();
                await axios.post(url, data, { withCredentials: true });

                alert("El Usuario A sido Habilitado Correctamente")
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
                document.getElementById('btn_cerrar_habilitar' + userId).click();
                await axios.post(url, data, { withCredentials: true });

                alert("El Usuario A sido Desabilitado Correctamente")
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
                document.getElementById('btn_cerrar_detalles_' + userId).click();
                await axios.post(url, data, { withCredentials: true });

                alert("Rol De Administrador Revocado")
                this.$emit("reloadUsers");
            } catch (error) {
                console.log(error)
            }
        },
        async grantAdminRole(userId) {

            const url = 'http://localhost:8080/usuario/grantAdmin';
            const data = {
                idUsuario: userId
            };

            try {
                document.getElementById('btn_cerrar_detalles_' + userId).click();
                await axios.post(url, data, { withCredentials: true });

                alert("Rol De Administrador Concedido")
                this.$emit("reloadUsers");

            } catch (error) {
                console.log(error)
            }
        },
    },
}

</script>

<template>

    <tr>
        <td data-cell="Nombre: ">{{ user.nombre }} {{ user.apellido }}</td>
        <td data-cell="Email: ">{{ user.email }} </td>
        <td data-cell="Rol: ">{{ this.capitalizeFirstLetter(user.Rol.rol) }}</td>
        <td data-cell="Estado: ">
            <span class="green" v-if="user.habilitado"> Activo </span>
            <span class="red" v-else> Inactivo </span>
        </td>
        <td style="white-space: nowrap;">
            <div class="icon icon_resaltable" data-bs-toggle="modal" :data-bs-target="'#modal' + user.idUsuario">
                <i class="bi bi-pencil-square"></i>
            </div>

            <div v-if="user.habilitado && user.idUsuario != this.usrStore.currentUser.idUsuario"
                class="icon icon_resaltable red" data-bs-toggle="modal"
                :data-bs-target="'#modalHabilitar' + user.idUsuario">
                <i class="bi bi-trash3-fill"></i>
            </div>

            <div v-else-if="!user.habilitado" class="icon icon_resaltable green" data-bs-toggle="modal"
                :data-bs-target="'#modalHabilitar' + user.idUsuario">
                <i class="bi bi-check"></i>
            </div>

            <div v-else-if="user.idUsuario == this.usrStore.currentUser.idUsuario" class="icon">
                <i class="bi bi-person-circle"></i>
            </div>
        </td>
    </tr>

    <!-- MODALS -->

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
                    <b v-if="!user.habilitado"> El Us uario se encuentra Inhabilitado </b>

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
                        Deshabilitar
                    </button>

                    <button v-else-if="!user.habilitado" type="button" class="btn btn-success"
                        @click="enableUser(user.idUsuario)"> Habilitar
                    </button>
                </div>

            </div>
        </div>
    </div>


</template>

<style scoped>
.icon {
    display: inline;
    font-size: 20px;
    padding: 6px 6px 4px 6px;
    margin: 0px 5px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1);
}

.icon_resaltable:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
}

.red {
    color: rgb(141, 2, 2);
}

.green {
    color: rgb(2, 141, 32);
}

.element {
    display: flex;
    width: 100%;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-between;
    text-align: center;
}
</style>