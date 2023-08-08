<template>
    <div v-if="usrStore.isLogged" class="container">
        <h1>you are already logged in</h1>
    </div>

    <div v-else class="borde_doble tamaño_xs">

        <div class="container_basic">
            <h1>INICIAR SESION</h1>
            <div>

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

    </div>
</template>

<script>
import { usrStore } from '../../components/store/usrStore'
import { useRouter } from "vue-router";

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
    margin-bottom: 20%;
    min-width: 300px;
}

.container_basic button {
    margin: 0 auto;
    margin-bottom: 30px;
    display: block;
}

.container_basic h1 {
  font-size: 30px;
  margin: 20px;
  text-align: center;
}
</style>