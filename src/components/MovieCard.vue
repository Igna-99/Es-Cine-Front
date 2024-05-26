<script>
import axios from "axios";
import { usrStore } from "../components/store/usrStore";

import { getMoviePoster, formatRuntime, formatDate } from "../../utils/funcionsMovieDB";

export default {
  data() {
    return {
      usrStore: usrStore(),
      moviefunctions: null,
    };
  },
  emits: ["reloadMovies"],
  props: ["movie"],
  async mounted() {
    this.loadMovieFunctions();
  },

  methods: {
    getMoviePoster,
    formatRuntime,
    formatDate,

    async loadMovieFunctions() {
      const url = `http://localhost:8080/funcion/cantidad/pelicula/${this.movie.id}`;

      try {
        const response = await axios.get(url, { withCredentials: true });
        this.moviefunctions = response.data.result;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteMovie() {
      const url = "http://localhost:8080/pelicula/delete";
      const data = {
        idPelicula: this.movie.id,
      };

      try {
        const response = await axios.post(url, data, { withCredentials: true });

        document.getElementById("btn_cerrar_modal" + this.movie.id).click();
        this.$emit("reloadMovies");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="card">
    <div class="image">
      <img :src="`https://image.tmdb.org/t/p/w1280/${this.movie.backdrop_path}`" alt="" />
    </div>
    <div class="content">
      <h2 class="title" :title="this.movie.title">
        {{ this.movie.title }}
      </h2>

      <p class="data"><b>Estreno:</b> {{ formatDate(movie.release_date) }}</p>
      <p class="data"><b>ID:</b> #{{ movie.id }}</p>
      <p class="data"><b>Duracion:</b> {{ formatRuntime(movie.runtime) }}</p>

      <button
        type="button"
        class="btn btn-outline-danger"
        data-bs-toggle="modal"
        :data-bs-target="'#modalHabilitar' + movie.id"
      >
        Eliminar
      </button>
    </div>
  </div>

  <!-- Modal -->

  <div
    class="modal fade"
    :id="'modalHabilitar' + movie.id"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    data-bs-theme="dark"
  >
    <div class="modal-dialog">
      <div class="modal-content text-light">
        <div class="modal-header">
          Eliminar Funcion
          <button
            :id="'btn_cerrar_modal' + movie.id"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>

        </div>

        <div class="modal-body">
          <p>Deseas Eliminar '{{ movie.title }}' de la tu cartelera de peliculas</p>

          <p v-if="this.moviefunctions == 0">
            La pelicula No Tiene Funciones Programadas
          </p>
          <p v-else>
            La pelicula Tiene {{ this.moviefunctions }} Funciones Programadas, las culaes
            seran eliminadas
          </p>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="deleteMovie()">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  max-width: 320px;
  border-radius: 0.5rem;
  background-color: #202020;

  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid transparent;
}

.card a {
  text-decoration: none;
}

.content {
  display: flex;
  flex-direction: column;
  padding: 1.1rem;
  gap: 10px;
}

.image {
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
}

.image img {
  width: 100%;
}

.title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  font-size: 1.125rem;
  line-height: 1.75rem;
  height: 3.5rem;
  font-weight: 600;
  color: white;
}

.data {
  color: #a8a8a8;
}

.action {
  display: inline-flex;
  margin-top: 1rem;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  align-items: center;
  gap: 0.25rem;
  background-color: #2563eb;
  padding: 4px 8px;
  border-radius: 4px;
}

.action span {
  transition: 0.3s ease;
}

.action:hover span {
  transform: translateX(4px);
}

.modal-header{
    font-size: 20px;
    font-weight: 600;

}

.modal-body{
    color: rgb(175, 175, 175);
}

</style>
