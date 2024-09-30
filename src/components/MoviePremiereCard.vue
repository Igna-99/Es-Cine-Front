<script>
import axios from "axios";
import { usrStore } from "./store/usrStore";
import { Modal } from "flowbite";
import { getMoviePoster, formatRuntime, formatDate } from "../../utils/funcionsMovieDB";

import PrimaryButtonModal from "./buttons/PrimaryButtonModal.vue";
import SecondaryButtonModal from "./buttons/SecondaryButtonModal.vue";
import DangerButtonModal from "./buttons/DangerButtonModal.vue";

export default {
  emits: ["reloadMovies"],
  props: ["movie"],
  data() {
    return {
      usrStore: usrStore(),

      modalInstances: {},
      scrollbarWidth: 0,

      disenabledButtons: false,
    };
  },
  components: {
    DangerButtonModal,
    PrimaryButtonModal,
    SecondaryButtonModal,
  },
  methods: {
    getMoviePoster,
    formatRuntime,
    formatDate,

    initializeModals() {
      const options = {
        placement: "top-center",
        backdrop: "dynamic",
        backdropClasses: "bg-gray-950/50 fixed inset-0 z-40 backdrop-blur-sm",
        closable: true,
        onHide: () => {
          document.body.style.marginRight = "";
        },
        onShow: () => {
          document.body.style.marginRight = `${this.scrollbarWidth}px`;
        },
      };

      const instanceOptions = {
        override: true,
      };

      this.modalInstances.movieDetailsModal = new Modal(
        this.$refs.movieDetailsModal,
        options,
        instanceOptions
      );

      this.modalInstances.ConfirmModal = new Modal(
        this.$refs.ConfirmModal,
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

    async deleteMovie() {
      const url = "http://localhost:8080/peliculaPorEstrenar/delete";
      const data = {
        idPelicula: this.movie.id,
      };

      this.disenabledButtons = true

      try {
        await axios.post(url, data, { withCredentials: true });
        this.$emit("reloadMovies");
        alert("Se ha eliminado la pelicula")
      } catch (error) {
        console.log(error);
      }
      this.closeModal("ConfirmModal");
      this.disenabledButtons = false
    },

    async releaseMovie() {
      const url = "http://localhost:8080/peliculaPorEstrenar/release";
      const data = {
        idPelicula: this.movie.id,
      };
      this.disenabledButtons = true

      try {
        await axios.post(url, data, { withCredentials: true });

        this.$emit("reloadMovies");
        alert("Se ha estrenado la pelicula")
      } catch (error) {
        console.log(error);
      }
      this.closeModal("movieDetailsModal");
      this.disenabledButtons = false
    },
  },
  mounted() {
    this.initializeModals();
  },
  beforeUnmount() {
    this.closeAllModals();
  },
};
</script>

<template>
  <div
    @click="openModal('movieDetailsModal')"
    class="hover:bg-zinc-700 cursor-pointer flex flex-row items-center bg-zinc-800 border border-zinc-700 rounded-lg shadow w-full h-40 overflow-hidden"
  >
    <img
      class="object-cover w-48 h-full rounded-lg select-none"
      :src="`https://image.tmdb.org/t/p/w1280/${this.movie.poster_path}`"
      alt=""
    />
    <div class="flex flex-col w-full h-full p-4 justify-around leading-normal">
      <h5 class="mb-2 text-lg text-pretty font-bold tracking-tight text-white">
        {{ this.movie.title }}
      </h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 select-none">
        {{ this.movie.release_date }}
      </p>
    </div>
  </div>

  <!-- Modal -->

  <div
    ref="movieDetailsModal"
    id="movieDetailsModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
  >
    <div class="relative p-4 w-full max-w-xl max-h-full mt-12 md:mt-20">
      <!-- Modal content -->
      <div class="relative bg-zinc-800 rounded-lg shadow">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Detalles</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="closeModal('movieDetailsModal')"
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
        <!-- Modal body -->
        <div class="p-4 md:p-5 space-y-1 text-left">
          <p class="text-base leading-relaxed text-gray-400">
            <b>Titulo: </b> {{ this.movie.title }}
          </p>
          <p class="text-base leading-relaxed text-gray-400">
            <b>ID: </b> #{{ movie.id }}
          </p>
          <p class="text-base leading-relaxed text-gray-400">
            <b>Estreno: </b> {{ formatDate(movie.release_date) }}
          </p>
          <p class="text-base leading-relaxed text-gray-400">
            <b>Duracion: </b> {{ formatRuntime(movie.runtime) }}
          </p>
        </div>
        <!-- Modal footer -->
        <div
          class="flex justify-center p-4 md:p-5 border-t rounded-b border-gray-600 md:justify-start"
        >
          <PrimaryButtonModal :disabled="disenabledButtons" @click="releaseMovie()"> Estrenar Pelicula </PrimaryButtonModal>
          <DangerButtonModal
            @click="
              closeModal('movieDetailsModal');
              openModal('ConfirmModal');
            "
          >
            Eliminar Pelicula</DangerButtonModal
          >
        </div>
      </div>
    </div>
  </div>

  <!-- Confirm Modal -->
  <div
    ref="ConfirmModal"
    id="ConfirmModal"
    tabindex="-1"
    class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
  >
    <div class="relative p-4 w-full max-w-xl max-h-full mt-12 md:mt-20">
      <div class="relative bg-zinc-800 rounded-lg shadow">
        <button
          @click="this.closeModal('ConfirmModal')"
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
        <div class="p-4 md:p-5 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-2 text-lg font-semibold text-gray-300">
            Estas seguro que deseas eliminar esta pelicula de la cartelera
          </h3>
          <p class="text-sm mb-5 leading-relaxed text-gray-500">
            Las funciones de esta pelicula seran eliminadas junto a la misma
          </p>
          <DangerButtonModal :disabled="disenabledButtons" @click="deleteMovie()"> Si, estoy Seguro </DangerButtonModal>

          <SecondaryButtonModal @click="this.closeModal('ConfirmModal')">
            No, cancelar
          </SecondaryButtonModal>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
