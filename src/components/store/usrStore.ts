import { defineStore } from "pinia";
import axios from "axios";
import getCookie from "../../../utils/getCookie.js";

export const usrStore = defineStore("usuariosStore", {
  state: () => ({
    currentUser: null,
    reservasDeUser: null,
  }),
  actions: {
    async registrarse(nombre, apellido, email, contraseña) {
      //si el usuarios se regista exitosamente devuelve null
      //en caso contrario un String con el/los mensaje/s de error

      let mensajeError;

      try {
        const url = "http://localhost:8080/usuario/create";
        const data = {
          nombre,
          apellido,
          email,
          contraseña,
        };

        const response = await axios.post(url, data);
      } catch (error) {
        if (error.response) {
          mensajeError = error.response.data.message;
          mensajeError = mensajeError.replace(/Validation error: /g, "");
        } else {
          mensajeError = "Error con el servidor";
        }
      }

      return mensajeError;
    },

    async logIn(email, contraseña) {
      //si el usuarios es logedo exitosamente devuelve null,
      //en caso contrario devuelve un String con el mensaje de error

      let mensajeError;

      try {
        const url = "http://localhost:8080/usuario/login";
        const data = {
          email,
          contraseña,
        };

        const response = await axios.post(url, data, { withCredentials: true });

        this.currentUser = response.data.payload;

        this.cargarReservas();
      } catch (error) {
        if (error.response) {
          mensajeError = error.response.data.message;
        } else {
          mensajeError = "Error con el servidor";
        }
      }

      return mensajeError;
    },

    async reiniciarSesion() {
      let cookieSesion = getCookie(document.cookie, "tokenCine");

      const url = "http://localhost:8080/usuario/me";

      if (cookieSesion) {
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
      }
    },

    async logOut() {
      this.currentUser = null;
      this.reservasDeUser = null;

      const url = "http://localhost:8080/usuario/logout";
      const data = {};

      const response = await axios.post(url, data, { withCredentials: true });
    },
  },
  getters: {
    isLogged() {
      return this.currentUser != null;
    },

    isAdmin() {
      return this.currentUser.idRol == 1;
    },
  },
});
