<script>
import axios from "axios";
import { usrStore } from "../../components/store/usrStore";
import PrimaryButton from "../../components/PrimaryButton.vue";

import {
  getMoviePoster,
  formatRuntime,
  formatDate,
} from "../../../utils/funcionsMovieDB";
import { navigateTo } from "../../../utils/navigateTo";

export default {
  components: {
    PrimaryButton,
  },
  data() {
    return {
      usrStore: usrStore(),

      idSelected: null,
      idLoadedInDB: null,
      movieFound: null,
      alreadyLoaded: null,
    };
  },
  async created() {
    document.title = "Administrar Peliculas";

    await this.loadMovieIdFromDB();
  },
  computed: {
    pelicula() {
      return this.movieFound;
    },
  },
  methods: {
    getMoviePoster,
    formatRuntime,
    formatDate,
    navigateTo,

    async loadMovieIdFromDB() {
      const urlApiCine = "http://localhost:8080/pelicula";

      try {
        const response = await axios.get(urlApiCine, { withCredentials: true });
        this.idLoadedInDB = response.data.result;
      } catch (error) {
        console.log(error);
      }
    },

    async serchInMovieDB() {
      try {
        if (!/^\d+$/.test(this.idSelected)) {
          throw new Error("se ingresaron caracteres");
        }

        const urlMovieDB = `https://api.themoviedb.org/3/movie/${this.idSelected}?api_key=6311677ef041038470aae345cd71bb78&language=es`;

        let rawData = await axios.get(urlMovieDB);

        this.movieFound = rawData.data;

        this.alreadyLoaded = this.idLoadedInDB.some(
          (item) => item.idPelicula == this.idSelected
        );

        document.getElementById("btn_modalLoad").click();
      } catch (error) {
        console.log(error);

        document.getElementById("btn_modalError").click();
      }
    },

    async addToMovieDB(movieId) {
      const url = "http://localhost:8080/pelicula/create";
      const data = { idPelicula: movieId };

      try {
        const response = await axios.post(url, data, { withCredentials: true });

        document.getElementById("btn_cerrar_modalLoad").click();

        await this.loadMovieIdFromDB();

        alert("la pelicula se cargo correctamente");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div v-if="!this.usrStore.isLogged" class="borde_doble">
    <div class="container_basic">
      <h1>no estas logeado</h1>
    </div>
  </div>

  <div v-else-if="!this.usrStore.isAdmin" class="borde_doble">
    <div class="container_basic">
      <h1>Acesso Denegado</h1>
    </div>
  </div>

  <div v-else class="borde_doble tamaño_xl">
    <div class="container_basic container_flex">
      <div class="neon-text-container">
        <h1 class="neon-text title-menus">Cargar Peliculas</h1>
      </div>

      <div class="container_btns">
        <button class="btn_basic" @click="navigateTo('peliculasEnCartelera')">
          Peliculas En Cartelera
        </button>
        <button class="btn_basic activado">Cargar Peliculas</button>
      </div>

      <div class="container_flex">
        <h5>Ingresa el ID de la pelicula que desea Agregar</h5>

        <div class="input_box input_login">
          <input type="text" placeholder="id" required v-model="this.idSelected" />
        </div>

        <PrimaryButton class="btn-search" @click="serchInMovieDB"> Buscar </PrimaryButton>

        <button
          id="btn_modalLoad"
          style="display: none"
          data-bs-toggle="modal"
          data-bs-target="#modalLoad"
        ></button>

        <button
          id="btn_modalError"
          style="display: none"
          data-bs-toggle="modal"
          data-bs-target="#modalError"
        ></button>
      </div>
    </div>

    <div
      class="modal fade"
      id="modalLoad"
      tabindex="-1"
      aria-labelledby="Modal"
      aria-hidden="true"
      data-bs-theme="dark"
    >
      <div class="modal-dialog">
        <div class="modal-content text-light">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              <b> Agregar Pelicula </b>
            </h1>
            <button
              id="btn_cerrar_modalLoad"
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div v-if="this.movieFound != null" class="modal-body">
            <div class="img_container">
              <img :src="getMoviePoster(this.pelicula.poster_path)" alt="Poster" />
            </div>

            <span> <b> Titulo: </b> {{ this.pelicula.title }} </span>

            <span> <b> Duracion: </b> {{ formatRuntime(pelicula.runtime) }} </span>

            <span>
              <b> Fecha de Estreno: </b> {{ formatDate(pelicula.release_date) }}
            </span>

            <span v-if="alreadyLoaded">
              <b> Esta Pelicula Ya Se Encuentra Cargada </b>
            </span>
          </div>
          <div v-if="this.movieFound != null" class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>

            <button v-if="alreadyLoaded" type="button" class="btn btn-primary" disabled>
              Agregar Pelicula
            </button>

            <button
              v-else
              type="button"
              class="btn btn-primary"
              @click="addToMovieDB(this.pelicula.id)"
            >
              Agregar Pelicula
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="modalError"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-theme="dark"
    >
      <div class="modal-dialog">
        <div class="modal-content text-light">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel"><b> Error </b></h1>
            <button
              id="btn_cerrar_detalles_"
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">la pelicula no existe</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.neon-text {
  margin: 30px 0px;
}

.container_btns {
  margin-bottom: 30px;
}

.container_basic input {
  text-align: center;
  margin: 30px 0px 0px 0px;
}

.activado {
  font-weight: bold;
  color: black;
  border: 2px solid black;
  background-color: rgba(255, 255, 255, 0.753);
}

.img_container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.img_container img {
  width: 50%;
  max-width: 150px;
  border: solid 5px rgb(151, 151, 151);
  border-radius: 5px;
}

.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.modal-body span {
  text-align: center;
}

.btn-search{
  margin: 30px 0px;
}

</style>
