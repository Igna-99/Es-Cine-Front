import { defineStore } from "pinia";
import axios from "axios";
import getCookie from '../../../utils/getCookie.js'

export const usrStore = defineStore('usuariosStore', {
    state: () => ({
        currentUser: null,
        reservasDeUser: null,


    }),
    actions: {

        async registrarse(nombre, apellido, email, contraseña) {

            //genera una promesa, si el usuarios se regista exitosamente devuelve null
            //en caso contrario un String con el/los mensaje/s de error

            return new Promise(async (resolve) => {

                let mensajeError

                try {
                    const url = 'http://localhost:8080/usuario/create';
                    const data = {
                        nombre,
                        apellido,
                        email,
                        contraseña,
                    };

                    const response = await axios.post(url, data);

                } catch (error) {

                    let mensajeRaw = error.response.data.message;
                    mensajeError = mensajeRaw.replace(/Validation error: /g, "");

                }

                resolve(mensajeError)
            })

        },

        async logIn(email, contraseña) {

            //genera una promesa, si el usuarios es logedo exitosamente devuelve null,
            //en caso contrario devuelve un String con el mensaje de error

            return new Promise(async (resolve) => {

                let mensajeError

                try {
                    const url = 'http://localhost:8080/usuario/login';
                    const data = {
                        email,
                        contraseña
                    };

                    const response = await axios.post(url, data, { withCredentials: true });

                    this.currentUser = response.data.payload

                    this.cargarReservas()

                } catch (error) {
                    mensajeError = error.response.data.message;
                }

                resolve(mensajeError)
            })

        },

        async reiniciarSesion() {

            let cookieSesion = getCookie(document.cookie, "tokenCine")

            const url = 'http://localhost:8080/usuario/me';

            if (cookieSesion != '') {
                try {

                    const response = await axios.get(url, { withCredentials: true });

                    this.currentUser = response.data.user;

                    this.cargarReservas();

                } catch (error) {
                    alert("no se pudo relogear");
                    console.log(error.response.data.message);
                }

            }

        },

        async cargarReservas() {

            try {
                const url = `http://localhost:8080/reserva/all`;

                const response = await axios.get(url, { withCredentials: true });

                let data = response.data.result;

                this.reservasDeUser = data;

            } catch (error) {

                console.error(error.response.data.message);

            };

        },

        async logOut() {

            this.currentUser = null;
            this.reservasDeUser = null;


            const url = 'http://localhost:8080/usuario/logout';
            const data = {};

            const response = await axios.post(url, data, { withCredentials: true });

        },


    },
    getters: {

        isLogged() {
            return this.currentUser != null;
        },
    },

})

