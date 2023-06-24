import { defineStore } from "pinia";
import axios from "axios";

export const usrStore = defineStore('usuariosStore', {
    state: () => ({
        currentUser: null,


    }),
    actions: {

        async registrarse(nombre, apellido, email, contraseña) {

            //genera una promesa, si el usuarios se regista exitosamente devuelve true, en caso contrario false

            return new Promise(async (resolve,) => {

                let Exito

                try {
                    const url = 'http://localhost:8080/usuario';
                    const data = {
                        nombre,
                        apellido,
                        email,
                        contraseña,
                    };

                    const response = await axios.post(url, data);

                    this.currentUser = response.data.result

                    Exito = response.data.success

                    this.currentUser.contraseña = contraseña 
                    //piso la contraseña hashed por la contraseña que ingreso el Usuario
                    //ya que si se llego a este punto la validacion fue correcta
        
                    window.localStorage.setItem("usuario", JSON.stringify(response.data.result));


                } catch (error) {
                    Exito = error.response.data.success;
                    console.log(error.response.data.message);
                }

                resolve(Exito)
            })

        },

        async logIn(email, contraseña) {

            //genera una promesa, si el usuarios es logedo exitosamente devuelve true, en caso contrario false

            return new Promise(async (resolve,) => {

                let Exito

                try {
                    const url = 'http://localhost:8080/usuario/login';
                    const data = {
                        email,
                        contraseña
                    };

                    const response = await axios.post(url, data);

                    this.currentUser = response.data.result

                    Exito = response.data.success

                    this.currentUser.contraseña = contraseña 
                    //piso la contraseña hashed por la contraseña que ingreso el Usuario
                    //ya que si se llego a este punto la validacion fue correcta
        
                    window.localStorage.setItem("usuario", JSON.stringify(response.data.result));


                } catch (error) {
                    Exito = error.response.data.success;
                    console.log(error.response.data.message);
                }

                resolve(Exito)
            })

        },

        logOut() {
            //log out y limpia el localStorage
            this.currentUser = null;

            window.localStorage.removeItem("usuario");
        },

        async cargarDataStorage() {

            // se llama desde el onMounted de la App.vue, toma los datos del user storage y intenta logear automaticamente
            // si la clave y email no fueron cambiadas relogea automaticamente, en caso contrario lanza un alert 

            let item = JSON.parse(String(window.localStorage.getItem("usuario")));

            if(item != null){

                let relogeado = await this.logIn(item.email, item.contraseña)
                
                if (!relogeado) {
                    alert("no se pudo relogear :(")
                    window.localStorage.removeItem("usuario");
                }

            }
            

        }

    },
    getters: {

        isLogged() {
            return this.currentUser != null;
        },
    },

})

