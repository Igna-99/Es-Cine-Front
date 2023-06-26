<template>
    <div v-if="!usrStore.isLogged" class="formulario">
        <div class="formulario_lg">
            <h2>REGISTRO</h2>
            <div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="inputBox">
                            <input type="text" required v-model="this.nombre">
                            <span>Nombre</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="inputBox">
                            <input type="text" required v-model="this.apellido">
                            <span>Apellido</span>
                        </div>
                    </div>
                </div>

                <div class="inputBox">
                    <input type="text" required v-model="this.email">
                    <span>Email</span>
                </div>

                <div class="inputBox">
                    <input type="password" required v-model="this.contraseña">
                    <span>contraseña</span>
                </div>

                <div class="inputBox">
                    <input type="password" required v-model="this.contraseñaRep">
                    <span>Repite Contraseña</span>
                </div>

                <button type="submit" class="ingresar" @click="registrse">Registrarse</button>

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

            this.error1 = false
            this.error2 = false
            this.error3 = false

            if (this.nombre == '' || this.apellido == '' || this.email == '' || this.contraseña == '' || this.contraseñaRep == '') {

                this.error1 = true

            } else if (this.contraseña != this.contraseñaRep) {

                this.error2 = true

            } else {

                let mensaje = await this.usrStore.registrarse(this.nombre, this.apellido, this.email, this.contraseña)

                if (mensaje == null) {

                    alert("te has registrado exitosamente")
                    this.$router.push("/login");

                } else {

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
.ingresar {
    font-size: 15px;
    padding: 0.7em 2.7em;
    letter-spacing: 0.06em;
    position: relative;
    font-family: inherit;
    border-radius: 4px;
    text-decoration: none;
    overflow: hidden;
    transition: all 0.3s;
    line-height: 1.4em;
    border: 2px solid white;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1%, transparent 40%, transparent 60%, rgba(145, 145, 145, 0.1) 100%);
    color: white;
    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 9px 3px rgba(255, 255, 255, 0.1);
}

.ingresar:hover {
    color: #ffffff;
    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.6), 0 0 9px 3px rgba(255, 255, 255, 0.2);
}

.ingresar:before {
    content: "";
    position: absolute;
    left: -4em;
    width: 4em;
    height: 100%;
    top: 0;
    transition: transform .4s ease-in-out;
    background: linear-gradient(to right, transparent 1%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0.1) 60%, transparent 100%);
}

.ingresar:hover:before {
    transform: translateX(15em);
}

.inputBox {
    position: relative;
    max-width: 100%;
    min-width: 250px;
    align-content: center;
    margin-bottom: 6%;
}

.row {
    margin-bottom: 1.5%;
}

.inputBox input {
    width: 100%;
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.25);
    background: #202020;
    border-radius: 1px;
    outline: none;
    color: white;
    font-size: 1em;
}

.inputBox span {
    position: absolute;
    left: 0;
    padding: 10px;
    pointer-events: none;
    font-size: 1em;
    color: rgba(255, 255, 255, 0.25);
    text-transform: uppercase;
    transition: 0.4s;
}

.inputBox input:valid~span,
.inputBox input:focus~span {
    color: white;
    transform: translateX(10px) translateY(-7px);
    font-size: 0.65em;
    padding: 0 10px;
    background: #202020;
    border-left: 1px solid white;
    border-right: 1px solid white;
    letter-spacing: 0.2em;
}

.inputBox input:valid,
.inputBox input:focus {
    border: 1px solid white;
}

.formulario {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border: none;
    background: none;
    color: #0f1923;
    position: relative;
    padding: 15px;
    font-weight: bold;
    font-size: 14px;
    transition: all .15s ease;
    max-width: 100%;
    width: 100%;
}

.formulario::before,
.formulario::after {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    height: calc(40%);
    border: 1px solid #ffffff;
    transition: all .15s ease;
}

.formulario::before {
    top: 0;
    border-bottom-width: 0;
}

.formulario::after {
    bottom: 0;
    border-top-width: 0;
}

.formulario_lg {
    gap: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    padding: 20px 80px;
    position: relative;
    color: #fff;
    background-color: #202020;
    overflow: hidden;
    max-width: 100%;
    z-index: 1;
    font-family: "Montserrat", sans-serif;
}

.formulario_lg button {
    margin: 0 auto;
    margin-bottom: 30px;
    display: block;

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



.salir {
    background-color: #af4c4c;
}


.salir:hover {
    background-color: #b83939;
}

.errorSpam {
    display: block;
    max-width: 400px;
}
</style>