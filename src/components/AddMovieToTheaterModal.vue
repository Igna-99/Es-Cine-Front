<script>
import axios from "axios";
import { getMovieFromTMDB } from "../../utils/funcionsMovieDB";

import PrimaryButton from "./buttons/PrimaryButton.vue";
import PrimaryButtonModal from "./buttons/PrimaryButtonModal.vue";

import { navigateTo } from "../../utils/navigateTo";
import { Modal } from "flowbite";

export default {
  emits: ["reloadMovies"],
  data() {
    return {
      modalInstances: {},
      scrollbarWidth: 0,

      idSelected: null,
      movieFound: null,
      addableMovie: false,

      errorMsj: null,
    };
  },
  components: {
    PrimaryButtonModal,
    PrimaryButton,
  },
  methods: {
    navigateTo,

    initializeModals() {
      const options = {
        placement: "top-center",
        backdrop: "dynamic",
        backdropClasses: "bg-gray-950/50 fixed inset-0 z-40 backdrop-blur-sm",
        closable: true,
        onHide: () => {
          this.errorCreateScreening = false;
          document.body.style.marginRight = "";
        },
        onShow: () => {
          document.body.style.marginRight = `${this.scrollbarWidth}px`;
        },
      };

      const instanceOptions = {
        override: true,
      };

      this.modalInstances.AddMovieModal = new Modal(
        this.$refs.AddMovieModal,
        options,
        instanceOptions
      );
    },
    openModal(modalName) {
      if (this.modalInstances[modalName]) {
        this.scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        this.modalInstances[modalName].toggle();
      }
    },
    closeModal(modalName) {
      if (this.modalInstances[modalName]) {
        this.modalInstances[modalName].hide();
      }
    },
    closeAllModals() {
      Object.values(this.modalInstances).forEach((modalInstance) => {
        if (modalInstance && !modalInstance._isHidden) {
          modalInstance.hide();
        }
      });
    },
    async serchInMovieDB() {
      this.errorMsj = "";
      this.addableMovie = false;
      this.movieFound = null;

      try {
        if (!/^\d+$/.test(this.idSelected)) {
          throw new Error("se ingresaron caracteres no numericos");
        }

        this.movieFound = await getMovieFromTMDB(this.idSelected);
        this.addableMovie = true;
      } catch (error) {
        if (error.status_code = 34) {
          this.errorMsj = "No se han encontrado peliculas con el ID seleccionado";
        } else {
          this.errorMsj = "Error al cargar pelicula";
          console.error(error);
        }
      }
    },
    async addMovieToDB() {
      const url = "http://localhost:8080/pelicula/create";
      const data = { idPelicula: this.idSelected };

      try {
        await axios.post(url, data, { withCredentials: true });
        this.$emit("reloadMovies");
        alert("la pelicula se cargo correctamente");
        this.closeModal("AddMovieModal");

        this.addableMovie = false;
        this.movieFound = null;
        this.idSelected = null;
      } catch (error) {
        this.addableMovie = false;
        if (error.response && error.response.data) {
          this.errorMsj = error.response.data.message;
        } else {
          this.errorMsj = "Error al cargar pelicula";
          console.error(error);
        }
      }
    },
  },
  async created() {},
  mounted() {
    this.initializeModals();
  },
  beforeUnmount() {
    this.closeAllModals();
  },
};
</script>

<template>
  <PrimaryButton @click="openModal('AddMovieModal')"> Agregar Pelicula </PrimaryButton>

  <!-- Main modal -->
  <div
    ref="AddMovieModal"
    id="AddMovieModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
  >
    <div class="relative p-4 w-full max-w-xl max-h-full mt-12 md:mt-20">
      <div class="rounded-lg shadow bg-zinc-800">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
            Agregar Pelicula a Cartelera
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="closeModal('AddMovieModal')"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <hr class="h-px bg-zinc-700 border-0" />

        <div class="p-5 md:p-6 space-y-4">
          <div class="flex flex-col items-center gap-y-4">
            <div class="input_box w-80">
              <input type="text" v-model="this.idSelected" required />
              <span>ID Pelicula</span>
            </div>
          </div>

          <div class="flex flex-col items-center space-y-4">
            <PrimaryButtonModal
              class="btn-width boton_crear_funcion"
              @click="serchInMovieDB"
            >
              Buscar Pelicula
            </PrimaryButtonModal>

            <div
              v-if="!this.movieFound"
              class="flex flex-row items-center bg-zinc-700/50 border border-zinc-700 rounded-lg shadow w-full h-40 overflow-hidden"
            />

            <div
              v-else
              class="flex flex-row items-center bg-zinc-700 border border-zinc-700 rounded-lg shadow w-full h-40 overflow-hidden"
            >
              <img
                class="object-cover w-48 h-full rounded-lg select-none"
                :src="`https://image.tmdb.org/t/p/w1280/${this.movieFound.poster_path}`"
                alt=""
              />
              <div class="flex flex-col w-full h-full p-4 justify-around leading-normal">
                <h5 class="mb-2 text-lg text-pretty font-bold tracking-tight text-white">
                  {{ this.movieFound.title }}
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 select-none">
                  {{ this.movieFound.release_date }}
                </p>
              </div>
            </div>

            <PrimaryButtonModal :disabled="!this.addableMovie" @click="addMovieToDB()">
              Agregar Pelicula
            </PrimaryButtonModal>

            <div
              v-if="this.errorMsj"
              class="p-4 text-md text-red-800 rounded-lg bg-red-200"
              role="alert"
            >
              <span class="font-semibold">{{ this.errorMsj }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-width: 430px) {
  .input_box {
    width: 100%;
  }
}
</style>
