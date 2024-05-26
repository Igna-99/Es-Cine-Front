<script>
import { usrStore } from "../../components/store/usrStore";

import { navigateTo } from "../../../utils/navigateTo";
import { loadMoviesFromDB } from "../../../utils/funcionsMovieDB";

import MovieCard from "../../components/MovieCard.vue";

export default {
  data() {
    return {
      usrStore: usrStore(),

      moviesInDB: [],
      show: false,
      moviesShowed: [],
    };
  },
  components: {
    MovieCard
  },
  async created() {
    document.title = "Administrar Peliculas";

    await this.loadMovies();
    this.showMovies();
  },
  methods: {
    navigateTo,

    async loadMovies() {
      this.moviesInDB = await loadMoviesFromDB();
    },

    showMovies() {
      this.moviesShowed = this.moviesInDB;
      this.show = true;
    },

    async reloadMovies() {
      await this.loadMovies();
      this.showMovies();
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

  <div v-else class="tamaño_xl">
    <div class="borde_doble">
      <div class="container_basic container_flex">
        <div class="neon-text-container">
          <h1 class="neon-text title-menus">Peliculas en Cartelera</h1>
        </div>
        <div class="container_btns">
          <button class="btn_basic activado">Peliculas En Cartelera</button>
          <button class="btn_basic" @click="navigateTo('cargarPelicula')">
            Cargar Peliculas
          </button>
        </div>
      </div>
    </div>

    <!-- peliculas -->

    <div v-if="show" class="movies_grid">
      <MovieCard
        v-for="movie in this.moviesShowed"
        :movie="movie"
        @reloadMovies="this.reloadMovies()"
      />
    </div>
    
  </div>
</template>

<style scoped>
.container_btns{
  margin-bottom: 30px;
}

.movies_grid {
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  justify-items: center;
}

.activado {
  font-weight: bold;
  color: black;
  border: 2px solid black;
  background-color: rgba(255, 255, 255, 0.753);
}

@media screen and (max-width: 1100px) {
  .movies_grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 650px) {
  .movies_grid {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
