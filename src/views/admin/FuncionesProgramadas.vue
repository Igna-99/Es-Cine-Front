<script>
import axios from "axios";
import { usrStore } from "../../components/store/usrStore";

import PrimaryButton from "../../components/PrimaryButton.vue";
import DangerButton from "../../components/DangerButton.vue";
import TrFuncion from "../../components/TrFuncion.vue";
import ModalCreateScreening from "../../components/ModalCreateScreening.vue";

import { navigateTo } from "../../../utils/navigateTo";
import { loadMoviesFromDB } from "../../../utils/funcionsMovieDB";

export default {
  data() {
    return {
      usrStore: usrStore(),

      moviesInDB: [],
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
  async created() {
    document.title = "Administrar Funciones";

    if (sessionStorage.getItem("preSelectedDate") == null) {
      this.initializeDate();
    } else {
      this.selectedDate = sessionStorage.getItem("preSelectedDate");
    }
    await this.loadFunctionsFromDB();
    await this.loadMovies();

    this.selectDate();
  },
  components: {
    DangerButton,
    PrimaryButton,
    TrFuncion,
    ModalCreateScreening,
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
      this.moviesInDB = await loadMoviesFromDB();
    },

    async loadCinemasRooms() {
      const url = "http://localhost:8080/sala/all";

      try {
        const response = await axios.get(url, { withCredentials: true });
        this.cinemaRoomsInDB = response.data.result;
      } catch (error) {
        console.log(error);
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

      while (index < this.moviesInDB.length && !encontrado) {
        if (this.moviesInDB[index].id == id) {
          resultado = this.moviesInDB[index].title;
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

    async reloadFunctions() {
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

  <div v-else class="tamaño_l borde_doble">
    <div class="container_basic container_flex gap_standar">
      <div class="neon-text-container">
        <h1 class="neon-text title-menus">Administrar Funciones</h1>
      </div>

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

      <div style="width: 100%" v-if="!this.error">
        <table style="table-layout: fixed">
          <thead>
            <tr>
              <th style="width: 70%">Pelicula</th>
              <th style="width: 10%">Sala</th>
              <th style="width: 10%">Horario</th>
              <th style="width: 10%"></th>
            </tr>
          </thead>
          <tbody>
            <TrFuncion
              v-for="funcion in this.displayedShows"
              @reloadFunctions="reloadFunctions()"
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
      <div style="display: flex; gap: 20px">
        <DangerButton @click="navigateTo('adminMenu')"> Regresar </DangerButton>
        <PrimaryButton data-bs-toggle="modal" data-bs-target="#exampleModal">
          Nueva Funcion</PrimaryButton
        >
      </div>
    </div>

    <ModalCreateScreening :moviesInDB="this.moviesInDB" />

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

@media screen and (max-width: 600px) {
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

@media screen and (max-width: 750px) {
  .autofill {
    display: none;
  }
}
</style>
