<template>
    <div v-if="usrStore.isLogged" class="container">
        <h1>you are already logged in</h1>
    </div>

    <div v-else class="borde_doble tamaño_s">
        <div class="container_basic container_flex">
            <h1>REGISTRO</h1>
            <div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="input_box input_registro">
                            <input type="text" required v-model="this.nombre">
                            <span>Nombre</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="input_box input_registro">
                            <input type="text" required v-model="this.apellido">
                            <span>Apellido</span>
                        </div>
                    </div>
                </div>

                <div class="input_box input_registro">
                    <input type="text" required v-model="this.email">
                    <span>Email</span>
                </div>

                <div class="input_box input_registro">
                    <input type="password" required v-model="this.contraseña">
                    <span>contraseña</span>
                </div>

                <div class="input_box input_registro">
                    <input type="password" required v-model="this.contraseñaRep">
                    <span>Repite Contraseña</span>
                </div>

                <button type="submit" class="btn_basic" @click="registrse">Registrarse</button>

                <div v-if="this.error1" class="alert alert-danger" role="alert">
                    <span class="errorSpam"> debe completar todos los campos </span>
                </div>
                <div v-if="this.error2" class="alert alert-danger" role="alert">
                    <span class="errorSpam"> las contraseñas no coinciden </span>
                </div>
                <div v-if="this.error3" class="alert alert-danger" role="alert">
                    <span class="errorSpam"> {{ this.msjError3 }} </span>
                </div>
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
            nombre: '',
            apellido: '',
            email: '',
            contraseña: '',
            contraseñaRep: '',
            error1: false,
            error2: false,
            error3: false,
            msjError3: '',
        }
    },
    methods: {

        async registrse() {
            if (this.nombre == '' || this.apellido == '' || this.email == '' || this.contraseña == '' || this.contraseñaRep == '') {

                this.error1 = true
                this.error2 = false
                this.error3 = false

            } else if (this.contraseña != this.contraseñaRep) {

                this.error1 = false
                this.error2 = true
                this.error3 = false

            } else {

                let mensaje = await this.usrStore.registrarse(this.nombre, this.apellido, this.email, this.contraseña)

                if (mensaje == null) {

                    this.error1 = false
                    this.error2 = false
                    this.error3 = false

                    alert("te has registrado exitosamente")
                    this.$router.push("/login");

                } else {
                    this.error1 = false
                    this.error2 = false
                    this.error3 = true
                    this.msjError3 = mensaje

                }
            }
        },

        salir() {
            this.usrStore.logOut()
        }
    },
    created() {
        document.title = "Registro"
    },

}
</script>   

<style scoped>
.input_registro {
    margin-bottom: 6%;
}
.row {
    margin-bottom: 1.5%;
}
.container_basic button {
    margin: 0 auto;
    margin-bottom: 30px;
    display: block;
}

</style>