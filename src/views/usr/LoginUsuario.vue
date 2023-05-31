<template>
    <div v-if="!usrStore.isLogged" class="container">
        <h1>Iniciar Sesión</h1>
        <div>
            <input type="text" placeholder="Correo electrónico" required v-model="this.email">
            <input type="password" placeholder="Contraseña" v-model="this.password">
            <button type="submit" class="ingresar" @click="ingresar">Iniciar Sesión</button>

            <div v-if="this.error1" class="alert alert-danger" role="alert">
                email o contraseña incorrectos
            </div>
            <div v-if="this.error2" class="alert alert-danger" role="alert">
                email o contraseña no ingreados
            </div>
        </div>
    </div>

    <div v-if="usrStore.isLogged" class="container">
        <h1>you are already logged in</h1>
        <button type="submit" class="salir" @click="salir">Salir</button>
    </div>
</template>

<script>
import { usrStore } from '../../components/store/usrStore'

export default {
    data() {
        return {
            usrStore: usrStore(),
            error1: false,
            error2: false,
            email: "",
            password: "",

        }
    },
    methods: {

        async ingresar() {
            this.error1 = false;
            if (this.email == "" || this.password == "") {
                this.error2 = true;
            } else {
                this.error2 = false;
                let res = await this.usrStore.logIn(this.email, this.password)
                if (res == false) {
                    this.error1 = true;
                }
            }
        },

        salir() {
            // metodo salir de usuario
            this.usrStore.logOut()
        }
    }

}

</script>

<style scoped>
body {
    background-color: #f2f2f2;
}

.container {
    font-family: "Montserrat", sans-serif;
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.container h1 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
}

.container input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.container button {
    width: 100%;
    padding: 10px;
    color: #fff;
    border: none;
    border-radius: 4px;
    margin-bottom: 15px;
    cursor: pointer;
}

.ingresar {
    background-color: #4CAF50;
}

.salir {
    background-color: #af4c4c;
}


.ingresar:hover {
    background-color: #45a049;
}

.salir:hover {
    background-color: #b83939;
}
</style>