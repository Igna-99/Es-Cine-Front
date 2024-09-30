<script>
import axios from "axios";
import { usrStore } from "../../components/store/usrStore";

import DangerButton from "../../components/buttons/DangerButton.vue";
import TrFuncion from "../../components/TrFuncion.vue";
import CreateScreeningModal from "../../components/CreateScreeningModal.vue";

import { navigateTo } from "../../../utils/navigateTo";
import { getMoviesInTheaterFromTMDB } from "../../../utils/funcionsMovieDB";

export default {
  data() {
    return {
      usrStore: usrStore(),

      moviesInTheater: [],
      screeningsInDB: [],

      selectedDate: null,
      screeningsOfSelectedDate: [],

      currentPage: 1,
      itemsPerPage: 5,
      totalScreeningsOfDay: 0,
      pagesShown: 1,

      error: false,
      msjError: null,
    };
  },
  components: {
    DangerButton,
    TrFuncion,
    CreateScreeningModal,
  },
  computed: {
    displayedShows() {
      let startIndex = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      let endIndex = startIndex + this.itemsPerPage;

      let result = [];

      if (this.screeningsOfSelectedDate) {
        result = this.screeningsOfSelectedDate.slice(startIndex, endIndex);
      }

      return result;
    },
  },
  methods: {
    navigateTo,

    async loadFunctionsFromDB() {
      const url = "http://localhost:8080/funcion/all";
      try {
        const response = await axios.get(url, { withCredentials: true });

        this.screeningsInDB = response.data.funcionesPorFecha;
      } catch (error) {
        console.log(error);
      }
    },

    async loadMovies() {
      try {
        this.moviesInTheater = await getMoviesInTheaterFromTMDB();
      } catch (error) {
        console.error(error.message || error);
      }
    },

    initializeDate() {
      const date = new Date();
      this.selectedDate = date.toISOString().slice(0, 10);
    },

    selectDate() {
      sessionStorage.setItem("preSelectedDate", this.selectedDate);
      this.screeningsOfSelectedDate = this.screeningsInDB[this.selectedDate];
      if (this.screeningsOfSelectedDate) {
        this.totalScreeningsOfDay = this.screeningsOfSelectedDate.length;
      } else {
        this.totalScreeningsOfDay = 0;
      }

      this.currentPage = 1;
    },

    movieTitle(id) {
      let index = 0;
      let encontrado = false;
      let resultado = "null";

      while (index < this.moviesInTheater.length && !encontrado) {
        if (this.moviesInTheater[index].id == id) {
          resultado = this.moviesInTheater[index].title;
          encontrado = true;
        } else {
          index++;
        }
      }

      return resultado;
    },

    changeDate(days) {
      let dateAux = new Date(this.selectedDate);
      dateAux.setDate(dateAux.getDate() + days);
      this.selectedDate = dateAux.toISOString().slice(0, 10);
      this.selectDate();
    },

    async reloadScreenings() {
      await this.loadFunctionsFromDB();
      await this.selectDate();
    },

    handlePageChange(data) {
      this.currentPage = data.currentPage;
    },

    updateMaxPagesShown() {
      const width = window.innerWidth;
      if (width < 500) {
        this.pagesShown = 1;
      } else if (width < 750) {
        this.pagesShown = 3;
      } else {
        this.pagesShown = 5;
      }
    },
  },
  async created() {
    document.title = "Administrar Funciones";

    if (sessionStorage.getItem("preSelectedDate") == null) {
      this.initializeDate();
    } else {
      this.selectedDate = sessionStorage.getItem("preSelectedDate");
    }

    await this.loadMovies();
    await this.loadFunctionsFromDB();
  
    this.selectDate();
  },
  mounted() {
    this.updateMaxPagesShown();
    window.addEventListener("resize", this.updateMaxPagesShown);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateMaxPagesShown);
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

  <div v-else class="menus-border max-w-4xl">
    <div class="container_basic py-5">
      <h1 class="neon-text text-4xl text-center pb-5">Administrar Funciones</h1>

      <div class="container_date_menu">
        <button class="button-date-back" @click="changeDate(-1)">
          <i class="bi bi-caret-left-fill"></i>
        </button>

        <div class="input_box">
          <input
            type="date"
            class="input_date"
            v-model="this.selectedDate"
            @change="selectDate"
          />
          <span>Fecha</span>
        </div>

        <button class="button-date-next" @click="changeDate(1)">
          <i class="bi bi-caret-right-fill"></i>
        </button>
      </div>

      <div class="container_date_btn_small">
        <button class="btn_basic btn_next" @click="changeDate(-1)">Anterior</button>
        <button class="btn_basic btn_previous" @click="changeDate(1)">Siguente</button>
      </div>

      <div class="text-white w-full" v-if="!this.error">
        <table class="table-fixed">
          <thead>
            <tr>
              <th class="w-[63%]">Pelicula</th>
              <th class="w-[10%]">Sala</th>
              <th class="w-[15%]">Horario</th>
              <th class="w-[11%]"></th>
            </tr>
          </thead>
          <tbody>
            <TrFuncion
              v-for="funcion in this.displayedShows"
              @reloadScreenings="reloadScreenings()"
              :function="funcion"
              :tittle="this.movieTitle(funcion.idPelicula)"
            />
            <tr
              class="autofill"
              v-for="n in this.itemsPerPage - this.displayedShows.length"
              :key="'empty-' + n"
            >
              <td colspan="5"></td>
            </tr>
          </tbody>
        </table>
        <vue-awesome-paginate
          v-model="this.currentPage"
          :total-items="this.totalScreeningsOfDay"
          :items-per-page="this.itemsPerPage"
          :max-pages-shown="this.pagesShown"
          @page-clicked="this.handlePageChange"
        >
          <template #prev-button>
            <span>
              <i class="bi bi-caret-left-fill"></i>
            </span>
          </template>
          <template #next-button>
            <span>
              <i class="bi bi-caret-right-fill"></i>
            </span>
          </template>
        </vue-awesome-paginate>
      </div>

      <div v-else="this.error" class="alert alert-danger">
        {{ this.msjError }}
      </div>

      <div class="flex flex-col-reverse gap-3 sm:flex-row">
        <DangerButton @click="navigateTo('adminMenu')"> Regresar </DangerButton>
        <CreateScreeningModal
          :moviesInTheater="this.moviesInTheater"
          @reloadScreenings="reloadScreenings()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Funca */

.container_date_menu {
  margin: 10px 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container_date_menu .btn_next {
  margin-right: 7px;
}

.container_date_menu .btn_previous {
  margin-left: 7px;
}

.button-date-back,
.button-date-next {
  border: none;
  background-color: black;
  color: white;
  border-radius: 8px;
  height: 46px;
  width: 46px;
}

.button-date-back:hover,
.button-date-next:hover {
  color: #e5e5e5;
  background-color: rgb(45, 45, 45);
}

.button-date-back {
  margin-right: 10px;
}
.button-date-next {
  margin-left: 10px;
}

.input_date {
  font-weight: bold;
  text-align: center;
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

@media screen and (max-width: 640px) {
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
.autofill {
  height: 74px;
}

@media screen and (max-width: 768px) {
  .autofill {
    display: none;
  }
}
</style>
