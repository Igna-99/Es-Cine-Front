<template>
  <div v-if="!this.usrStore.isLogged" class="borde_doble">
    <div class="container_detalles">
      <h1>no estas logeado</h1>
    </div>
  </div>

  <div v-else-if="!this.usrStore.isAdmin" class="borde_doble">
    <div class="container_detalles">
      <h1>Acesso Denegado</h1>
    </div>
  </div>

  <div v-else class="tamaño_l">

    <!-- titulo -->
    <div class="borde_doble">
      <div class="container_basic">

        <button class="elemento_flotante btn_basic" @click="navigateTo('menuAdministracion')"> Regresar </button>

        <h1> <b> Administrar Peliculas </b> </h1>

        <div class="container_botones">
          <button class="btn_basic activado"> Peliculas En Cartelera </button>
          <button class="btn_basic" @click="navigateTo('cargarPelicula')"> Cargar Pelicula </button>
        </div>

      </div>
    </div>


    <!-- peliculas -->

    <div v-if="show">

      <ElementoListaPelicula v-for="movie in this.moviesInDB" :movie="movie" />

    </div>

  </div>
</template>
  
<script>
import axios from 'axios'
import { usrStore } from '../../components/store/usrStore'

import ElementoListaPelicula from '../../components/ElementoListaPelicula.vue'
import { navigateTo } from '../../../utils/navigateTo'

export default {
  data() {
    return {
      usrStore: usrStore(),

      moviesInDB: [],
      show: false,
    }
  },
  components: {
    ElementoListaPelicula,
  },
  async created() {

    document.title = "Administrar Peliculas";

    await this.loadMoviesFromDB()

  },
  methods: {
    navigateTo,

    async loadMoviesFromDB() {

      const urlApiCine = 'http://localhost:8080/pelicula'

      try {

        const response = await axios.get(urlApiCine, { withCredentials: true });
        let idPeliculas = response.data.result

        for (let index = 0; index < idPeliculas.length; index++) {
          const idPelicula = idPeliculas[index].idPelicula;

          const urlMovieDB = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=6311677ef041038470aae345cd71bb78&language=es`;

          let responsePelicula = await axios.get(urlMovieDB);
          this.moviesInDB.push(responsePelicula.data)
        }

        this.show = true

      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
  
<style scoped>
.container_basic h1 {
  margin-top: 35px;
}

.container_basic span {
  margin: 0px;
} 

.container_botones {
  display: flex;
  justify-content: center;
}

.activado {
  font-weight: bold;
  color: black;
  border: 2px solid black;
  background-color: rgba(255, 255, 255, 0.753);
}
</style>