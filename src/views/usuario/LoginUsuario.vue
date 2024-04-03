<template>
    <div v-if="usrStore.isLogged" class="">
        <h1>you are already logged in</h1>
    </div>

    <div v-else class="borde_doble tamaño_xs margin_standar">

        <div class="container_basic container_flex">

            <div class="neon-text-container">
                <h1 class="neon-text">INICIAR SESION</h1>
            </div>

            <div class="input_box input_login">
                <input type="text" required v-model="this.email">
                <span>email</span>
            </div>

            <div class="input_box input_login">
                <input type="password" required v-model="this.contraseña">
                <span>Contraseña</span>
            </div>

            <button type="submit" class="btn_basic" @click="ingresar">Iniciar Sesión</button>

            <div v-if="this.error" class="alert alert-danger" role="alert">
                {{ this.msjError }}
            </div>

        </div>

    </div>
</template>

<script>
import { usrStore } from '../../components/store/usrStore'

export default {
    data() {
        return {
            usrStore: usrStore(),
            error: false,
            msjError: "",
            email: "",
            contraseña: "",
        }
    },
    mounted() {

        if (this.usrStore.isLogged) {
            this.$router.push("/detallesUsuario");
        }

        document.title = "Iniciar Sesion"

    },
    updated() {
        if (this.usrStore.isLogged) {
            this.$router.push("/detallesUsuario");
        }

    },
    methods: {
        async ingresar() {

            if (this.email == "" || this.contraseña == "") {

                this.error = true;
                this.msjError = `email o contraseña no ingreados`

            } else {

                let mensajeError = await this.usrStore.logIn(this.email, this.contraseña);

                if (mensajeError == null) {

                    this.error = false;
                    this.$router.push("/detallesUsuario");

                } else {
                    this.error = true;
                    this.msjError = mensajeError;

                }
            }
        },

        salir() {
            // metodo salir de usuario
            this.usrStore.logOut()
        }
    },

}
</script>

<style scoped>
.input_login {
    margin: 15px 0px;
    width: 100%;
}

.container_basic button {
    margin: 0 auto;
    margin: 20px 0px;
    display: block;
}

.container_basic h1 {
    font-size: 40px;
    margin: 20px;
}
</style>