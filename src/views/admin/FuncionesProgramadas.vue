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

  <div v-else class="borde_doble tamaño_l">

    <!-- titulo -->

    <div class="container_basic header">

      <button class="elemento_flotante btn_basic" @click="navigateTo('menuAdministracion')"> Regresar </button>

      <h1> <b> Administrar Funciones </b> </h1>

      <div class="container_btns">
        <button class="btn_basic activated"> Funciones Programadas </button>
        <button class="btn_basic" @click="navigateTo('programarFunciones')">Programar Funciones</button>
      </div>

    </div>

    <!-- menu fecha -->

    <div class="container_basic">
      <div class="container_date_menu">

        <button class="btn_basic btn_anterior" @click="changeDate(-1)" style="margin-right: 10px;"> Anterior</button>

        <div class="input_box">
          <input type="date" class="input_date" v-model="this.selectedDate" @change="selectDate">
          <span>Fecha</span>
        </div>

        <button class="btn_basic btn_siguente_sm" @click="changeDate(1)" style="margin-left: 10px;"> Siguente</button>

      </div>

      <div class="container_date_btn_small">

        <button class="btn_basic btn_anterior" @click="changeDate(-1)" style="margin-right: 5px;"> Anterior</button>
        <button class="btn_basic btn_siguente" @click="changeDate(1)" style="margin-left: 5px;"> Siguente</button>

      </div>
    </div>

    <!-- Funciones Encontradas -->

    <div v-for="funcion in this.SelectedDateFunctions" class="container_basic elemento_funcion resaltable">
      <span> Funcion #{{ funcion.idFuncion }} | sala {{ funcion.sala }} | Horario {{ funcion.horario }} | {{
        this.movieTitle(funcion.idPelicula) }} </span>
    </div>

  </div>
</template>
  
<script>
import axios from 'axios'
import { usrStore } from '../../components/store/usrStore'

import { navigateTo } from '../../../utils/navigateTo'

export default {
  data() {
    return {
      usrStore: usrStore(),

      moviesInDB: [],
      functionsInDB: null,

      selectedDate: null,
      SelectedDateFunctions: null,
    }
  },
  async created() {

    document.title = "Administrar Funciones";

    this.initializeDate();

    await this.loadFunctionsFromDB();
    await this.loadMoviesFromDB();

    this.selectDate()

  },
  methods: {
    navigateTo,

    async loadFunctionsFromDB() {
      const url = 'http://localhost:8080/funcion/all';
      try {
        const response = await axios.get(url, { withCredentials: true });

        this.functionsInDB = response.data.funcionesPorFecha
      } catch (error) {
        console.log(error)
      }
    },

    async loadMoviesFromDB() {

      const urlApiPeliculas = 'http://localhost:8080/pelicula'

      try {

        const response = await axios.get(urlApiPeliculas, { withCredentials: true });
        let moviesID = response.data.result

        for (let index = 0; index < moviesID.length; index++) {
          const idPelicula = moviesID[index].idPelicula;

          const urlMovieDB = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=6311677ef041038470aae345cd71bb78&language=es`;
          let responseMovieDB = await axios.get(urlMovieDB);
          this.moviesInDB.push(responseMovieDB.data)
        }

      } catch (error) {
        console.log(error)
      }
    },

    initializeDate() {

      const date = new Date()
      this.selectedDate = date.toISOString().slice(0, 10);
    },

    selectDate() {
      this.SelectedDateFunctions = this.functionsInDB[this.selectedDate]
    },

    movieTitle(id) {

      let index = 0
      let encontrado = false
      let resultado = "null"

      while (index < this.moviesInDB.length && !encontrado) {
        if (this.moviesInDB[index].id == id) {
          resultado = this.moviesInDB[index].title
          encontrado = true
        } else {
          index++
        }
      }

      return resultado
    },

    changeDate(days) {

      let dateAux = new Date(this.selectedDate);

      dateAux.setDate(dateAux.getDate() + days);

      this.selectedDate = dateAux.toISOString().slice(0, 10);

      this.selectDate()

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

.header {
  margin-bottom: 20px;
}

.container_btns {
  display: flex;
  justify-content: center;
}

.input_date {
  font-weight: bold;
  text-align: center;
}


.container_date_menu {
  display: flex;
  justify-content: center;
}

.container_date_btn_small {
  display: none;
  width: 80%;
  justify-content: center;
}


@media screen and (max-width:600px) {

  .input_box {
    width: 100%;
  }

  .container_date_btn_small .btn_basic {
    width: 100%;
    padding: 1.5em 1.2em;
  }

  .container_date_menu {
    width: 80%;
  }

  .container_date_menu button {
    display: none;
  }

  .container_date_btn_small {
    display: flex;
  }
}




.activated {
  font-weight: bold;
  color: black;
  border: 2px solid black;
  background-color: rgba(255, 255, 255, 0.753);
}

.resaltable:hover {
  background-color: rgba(170, 170, 170, 0.534);
  border-radius: 5px;
  cursor: pointer;
}

.elemento_funcion {
  margin-top: 20px;
  padding: 30px 80px;
  border-radius: 5px;
}
</style>