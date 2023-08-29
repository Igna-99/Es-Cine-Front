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

  <div v-else class="tamaño_l">
    
    <!-- titulo -->
    <div class="borde_doble" >

      <div class="container_basic container_flex header">

        <button class="elemento_flotante btn_basic" @click="navigateTo('menuAdministracion')"> Regresar </button>

        <h1> <b> Administrar Funciones </b> </h1>

        <div class="container_btns">
          <button class="btn_basic activated"> Funciones Programadas </button>
          <button class="btn_basic" @click="navigateTo('programarFunciones')">Programar Funciones</button>
        </div>

      </div>

      <!-- menu fecha -->

      <div class="container_basic container_flex">
        <div class="container_date_menu">

          <button class="btn_basic btn_next" @click="changeDate(-1)"> Anterior</button>

          <div class="input_box">
            <input type="date" class="input_date" v-model="this.selectedDate" @change="selectDate">
            <span>Fecha</span>
          </div>

          <button class="btn_basic btn_previous" @click="changeDate(1)"> Siguente</button>

        </div>

        <div class="container_date_btn_small">

          <button class="btn_basic btn_next" @click="changeDate(-1)"> Anterior</button>
          <button class="btn_basic btn_previous" @click="changeDate(1)"> Siguente</button>

        </div>
      </div>

    </div>

    <!-- Funciones Encontradas -->
    <div class="borde_doble pad_sm">

      <div v-if="!this.SelectedDateFunctions" class=" container_basic elemento_funcion">
        <div class="alert alert-danger" role="alert">
          No Hay Funciones Programadas Para Este Dia
        </div>
      </div>

      <div v-else v-for="funcion in this.SelectedDateFunctions">
        <ElementoListaFuncion :function="funcion" :tittle="this.movieTitle(funcion.idPelicula)"
          @reloadFunctions="reloadFunctions()" />
      </div>

    </div>

  </div>
</template>
  
<script>
import axios from 'axios'
import { usrStore } from '../../components/store/usrStore'

import ElementoListaFuncion from '../../components/ElementoListaFuncion.vue'
import { navigateTo } from '../../../utils/navigateTo'
import { loadMoviesFromDB } from '../../../utils/funcionsMovieDB'

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
  components: {
    ElementoListaFuncion,
  },
  async created() {

    document.title = "Administrar Funciones";

    if (sessionStorage.getItem('preSelectedDate') == null) {

      this.initializeDate();
    } else {

      this.selectedDate = sessionStorage.getItem('preSelectedDate');
    }

    await this.loadFunctionsFromDB();
    await this.loadMovies();

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

    async loadMovies() {
      this.moviesInDB = await loadMoviesFromDB();
    },

    initializeDate() {
      const date = new Date()
      this.selectedDate = date.toISOString().slice(0, 10);
    },

    selectDate() {
      sessionStorage.setItem('preSelectedDate', this.selectedDate);
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

    async reloadFunctions() {
      await this.loadFunctionsFromDB();
      await this.selectDate();
    },
  },
}
</script>
  
<style scoped>
.container_basic h1 {
  margin-top: 35px;
}

.input_date {
  font-weight: bold;
  text-align: center;
}

.container_date_menu {
  width: 100%;
  display: flex;
  justify-content: center;
}

.container_date_menu .btn_next {
  margin-right: 7px;
}

.container_date_menu .btn_previous {
  margin-left: 7px;
}

.container_date_btn_small {
  display: none;
  width: 100%;
  justify-content: center;
}

.container_date_btn_small .btn_next {
  margin-right: 4px;
}

.container_date_btn_small .btn_previous {
  margin-left: 4px;
}

.activated {
  font-weight: bold;
  color: black;
  border: 2px solid black;
  background-color: rgba(255, 255, 255, 0.753);
}

.elemento_funcion {
  padding: 10px 8%;
  border-radius: 5px;
  margin: 10px 0px;
}

.pad_sm {
  margin-top: 10px;
  padding: 5px 15px;
}

@media screen and (max-width:600px) {

  .container_date_btn_small .btn_basic {
    width: 100%;
    padding: 1.5em 1.2em;
  }

  .container_date_menu {
    width: 100%;
  }

  .container_date_menu .input_box {
    width: 100%;
  }

  .container_date_menu button {
    display: none;
  }

  .container_date_btn_small {
    display: flex;
  }
}
</style>