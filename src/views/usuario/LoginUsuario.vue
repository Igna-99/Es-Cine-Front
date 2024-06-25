<script>
import { usrStore } from '../../components/store/usrStore'
import PrimaryButton from '../../components/PrimaryButton.vue'

export default {
    components: {
        PrimaryButton
    },
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
            this.$router.push({name:'usuario'});
        }

        document.title = "Iniciar Sesion"

    },
    updated() {
        if (this.usrStore.isLogged) {
            this.$router.push({name:'usuario'});
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
                    this.$router.push({name:'usuario'});

                } else {
                    this.error = true;
                    this.msjError = mensajeError;

                }
            }
        },

        salir() {
            this.usrStore.logOut()
        }
    },

}
</script>

<template>
    <div v-if="usrStore.isLogged" class="">
        <h1>you are already logged in</h1>
    </div>

    <div v-else class="borde_doble tamaño_xs margin_standar">
        <div class="container_basic container_flex">

            <div class="neon-text-container">
                <h1 class="neon-text title-menus">INICIAR SESION</h1>
            </div>

            <div class="input_box input_login">
                <input type="text" required v-model="this.email">
                <span>email</span>
            </div>

            <div class="input_box input_login">
                <input type="password" required v-model="this.contraseña">
                <span>Contraseña</span>
            </div>

            <PrimaryButton @click="ingresar">Iniciar Sesión</PrimaryButton>


            <div v-if="this.error" class="alert alert-danger" role="alert">
                {{ this.msjError }}
            </div>

        </div>

    </div>
</template>



<style scoped>
.neon-text {
  margin: 30px 0px 15px 0px;
}

.input_login {
    margin: 15px 0px;
    width: 95%;
    max-width: 400px;
}

.container_basic button {
    margin: 15px 0px;
}


</style>