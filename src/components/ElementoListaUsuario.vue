<template>
    <div class="container_basic">
        <span>
            <div v-if="usuario.habilitado && usuario.idUsuario != this.usrStore.currentUser.idUsuario"
                class="contenedor_icono trash resaltable" data-bs-toggle="modal"
                :data-bs-target="'#modalHabilitar' + usuario.idUsuario">
                <i class="bi bi-trash3-fill"></i>
            </div>

            <div v-else-if="!usuario.habilitado" class="contenedor_icono check resaltable" data-bs-toggle="modal"
                :data-bs-target="'#modalHabilitar' + usuario.idUsuario">
                <i class="bi bi-check"></i>
            </div>

            <div v-else-if="usuario.idUsuario == this.usrStore.currentUser.idUsuario" class="contenedor_icono user">
                <i class="bi bi-person-circle"></i>
            </div>

            {{ usuario.nombre }} {{ usuario.apellido }} | {{ usuario.email }} | {{ usuario.Rol.rol }}

            <div class="contenedor_icono edit resaltable" data-bs-toggle="modal"
                :data-bs-target="'#modal' + usuario.idUsuario">
                <i class="bi bi-pencil-square"></i>
            </div>
        </span>
    </div>

    <!-- MODALS -->

    <!-- Habilitar Usuario -->
    <div v-if="usuario.idUsuario != this.usrStore.currentUser.idUsuario" class="modal fade"
        :id="'modalHabilitar' + usuario.idUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
        data-bs-theme="dark">
        <div class="modal-dialog">
            <div class="modal-content text-light">

                <div class="modal-header ">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                        <b v-if="usuario.habilitado"> Deshabilitar Usuario </b>
                        <b v-else-if="!usuario.habilitado"> Habilitar Usuario </b>
                    </h1>
                    <button :id="'btn_cerrar_habilitar' + usuario.idUsuario" type="button" class="btn-close"
                        data-bs-dismiss="modal" aria-label="Close">
                    </button>
                </div>

                <div class="modal-body">
                    <span v-if="usuario.habilitado"> Deseas Deshabilitar la cuenta de este Usuario? </span>
                    <span v-else-if="!usuario.habilitado"> Deseas Habilitar la cuenta de este Usuario? </span>
                </div>

                <div class="modal-footer">
                    <button v-if="usuario.habilitado" type="button" class="btn btn-danger"
                        @click="deshabilitarUsuario(usuario.idUsuario)">
                        Deshabilitar </button>
                    <button v-else-if="!usuario.habilitado" type="button" class="btn btn-success"
                        @click="habilitarUsuario(usuario.idUsuario)"> Habilitar
                    </button>
                </div>

            </div>
        </div>
    </div>

    <!-- Detalles -->
    <div class="modal fade" :id="'modal' + usuario.idUsuario" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true" data-bs-theme="dark">
        <div class="modal-dialog">
            <div class="modal-content text-light">
                <div class="modal-header ">
                    <h1 v-if="usuario.idUsuario == this.usrStore.currentUser.idUsuario" class="modal-title fs-5"
                        id="exampleModalLabel"> <b> {{ usuario.nombre }} {{ usuario.apellido }} </b> (tu usuario)
                    </h1>
                    <h1 v-else-if="usuario.idUsuario != this.usrStore.currentUser.idUsuario" class="modal-title fs-5"
                        id="exampleModalLabel">
                        <b> {{ usuario.nombre }} {{ usuario.apellido }} </b>
                    </h1>
                    <button :id="'btn_cerrar_detalles_' + usuario.idUsuario" type="button" class="btn-close"
                        data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <b>ID de Usuario</b> {{ usuario.idUsuario }} <br>
                    <b>Email</b> {{ usuario.email }} <br>
                    <b>Rol</b> {{ usuario.Rol.rol }} <br>
                    <br>
                    <b v-if="!usuario.habilitado"> El Usuario se encuentra Inhabilitado </b>

                </div>
                <div class="modal-footer">

                    <button v-if="usuario.Rol.rol == 'admin' && usuario.idUsuario != this.usrStore.currentUser.idUsuario"
                        type="button" class="btn btn-danger" @click="quitarAdmin(usuario.idUsuario)">Quitar
                        Privilegios de Admin</button>

                    <button v-else-if="usuario.Rol.rol == 'user'" type="button" class="btn btn-success"
                        @click="concederAdmin(usuario.idUsuario)">Conceder
                        Privilegios de Admin</button>

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
    emits: ['recargar'],
    props: ['usuario'],
    methods: {

        async habilitarUsuario(idUsuario) {

            console.log(idUsuario);

            const url = 'http://localhost:8080/usuario/enableUser';

            const data = {
                idUsuario
            };

            try {

                const response = await axios.post(url, data, { withCredentials: true });

                console.log(response)

                document.getElementById('btn_cerrar_habilitar' + idUsuario).click();

                this.$emit("recargar");

            } catch (error) {
                console.log(error)
            }
        },

        async deshabilitarUsuario(idUsuario) {

            console.log(idUsuario);

            const url = 'http://localhost:8080/usuario/disableUser';

            const data = {
                idUsuario
            };

            try {

                const response = await axios.post(url, data, { withCredentials: true });

                console.log(response)

                document.getElementById('btn_cerrar_habilitar' + idUsuario).click();

                this.$emit("recargar");

            } catch (error) {
                console.log(error)
            }
        },

        async quitarAdmin(idUsuario) {

            const url = 'http://localhost:8080/usuario/removeAdmin';

            const data = {
                idUsuario
            };

            try {

                const response = await axios.post(url, data, { withCredentials: true });

                document.getElementById('btn_cerrar_detalles_' + idUsuario).click();

                this.$emit("recargar");

            } catch (error) {
                console.log(error)
            }
        },

        async concederAdmin(idUsuario) {

            const url = 'http://localhost:8080/usuario/grantAdmin';
            const data = {
                idUsuario
            };

            try {
                const response = await axios.post(url, data, { withCredentials: true });

                document.getElementById('btn_cerrar_detalles_' + idUsuario).click();

                this.$emit("recargar");

            } catch (error) {
                console.log(error)
            }
        },

    },

}

</script>

<style scoped>

.contenedor_icono {
    display: inline;
    font-size: 20px;
    padding: 18px 22px;
}


.edit {
    margin-left: 20px;
}

.trash {
    color: rgb(141, 2, 2);
    margin-right: 20px;
}

.check {
    color: rgb(2, 141, 32);
    margin-right: 20px;
}

.user {
    color: rgb(255, 255, 255);
    margin-right: 20px;
}
</style>