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

    <!-- titulo -->
    <div class="borde_doble">
      <div class="container_basic container_flex">

        <button class="elemento_flotante btn_basic" @click="navigateTo('menuAdministracion')"> Regresar </button>

        <h1> <b> Administrar Peliculas </b> </h1>

        <div class="container_btns">
          <button class="btn_basic activado"> Peliculas En Cartelera </button>
          <button class="btn_basic" @click="navigateTo('cargarPelicula')"> Cargar Pelicula </button>
        </div>

      </div>
    </div>

    <!-- peliculas -->

    <div v-if="show" class="movies_grid">
      <ElementoListaPelicula v-for="movie in this.moviesShowed" :movie="movie" @reloadMovies="this.reloadMovies()" />
    </div>

  </div>
</template>
  
<script>
import { usrStore } from '../../components/store/usrStore'

import ElementoListaPelicula from '../../components/ElementoListaPelicula.vue'
import { navigateTo } from '../../../utils/navigateTo'
import { loadMoviesFromDB } from '../../../utils/funcionsMovieDB'

export default {
  data() {
    return {
      usrStore: usrStore(),

      moviesInDB: [],
      show: false,
      moviesShowed: []
    }
  },
  components: {
    ElementoListaPelicula,
  },
  async created() {
    document.title = "Administrar Peliculas";

    await this.loadMovies()
    this.showMovies()
  },
  methods: {
    navigateTo,

    async loadMovies() {
      this.moviesInDB = await loadMoviesFromDB();
    },

    showMovies(){
      this.moviesShowed = this.moviesInDB;
      this.show = true;
    },

    async reloadMovies(){
      await this.loadMovies()
      this.showMovies()
    },

  },
}
</script>

<style scoped>
.movies_grid{
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.container_basic h1 {
  margin-top: 35px;
}

.activado {
  font-weight: bold;
  color: black;
  border: 2px solid black;
  background-color: rgba(255, 255, 255, 0.753);
}

@media screen and (max-width:1000px) {
    .movies_grid {
        display: grid;
        grid-template-columns: 1fr;
    }
}
</style>