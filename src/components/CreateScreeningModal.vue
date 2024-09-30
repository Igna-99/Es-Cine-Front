<script>
import axios from "axios";

import PrimaryButton from "./buttons/PrimaryButton.vue";

import { navigateTo } from "../../utils/navigateTo";
import { Modal } from "flowbite";

export default {
  props: ["moviesInTheater"],
  emits: ["reloadScreenings"],
  data() {
    return {
      modalInstances: {},
      scrollbarWidth: 0,
      cinemaRoomsInDB: null,

      cinemaRoomNewScreening: null,
      hourNewScreening: null,
      dateNewScreening: null,
      movieNewScreening: null,

      errorCreateScreening: false,
      msjErrorCreateScreening: null,

      disenabledButton: false,
    };
  },
  components: {
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

      this.modalInstances.newScreeningModal = new Modal(
        this.$refs.newScreeningModal,
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

    async loadCinemasRooms() {
      const url = "http://localhost:8080/sala/all";

      try {
        const response = await axios.get(url, { withCredentials: true });
        this.cinemaRoomsInDB = response.data.result;
      } catch (error) {
        console.log(error);
      }
    },

    async createFunction() {
      this.disenabledButton = true;
      this.errorCreateScreening = false;

      const url = "http://localhost:8080/funcion";

      if (
        this.cinemaRoomNewScreening == null ||
        this.hourNewScreening == null ||
        this.dateNewScreening == null ||
        this.movieNewScreening == null
      ) {
        this.errorCreateScreening = true;
        this.msjErrorCreateScreening = "Complete todos los campos";
      } else {
        try {
          const data = {
            sala: this.cinemaRoomNewScreening,
            horario: this.hourNewScreening,
            fecha: this.dateNewScreening,
            idPelicula: this.movieNewScreening,
          };

          await axios.post(url, data, { withCredentials: true });

          alert("La Funcion se a creado exitosamente");

          this.$emit("reloadScreenings");

          this.cinemaRoomNewScreening = null;
          this.hourNewScreening = null;
          this.dateNewScreening = null;
          this.movieNewScreening = null;

          this.closeModal("newScreeningModal");
        } catch (error) {
          console.error(error);
          this.errorCreateScreening = true;
          this.msjErrorCreateScreening = error.response.data.message;
        }
      }

      this.disenabledButton = false;
    },
  },
  async created() {
    await this.loadCinemasRooms();
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
  <PrimaryButton @click="openModal('newScreeningModal')"> Nueva Funcion </PrimaryButton>
  <!-- Main modal -->
  <div
    ref="newScreeningModal"
    id="newScreeningModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
  >
    <div class="relative p-4 w-full max-w-xl max-h-full mt-12 md:mt-20">
      <div class="relative rounded-lg shadow bg-zinc-800">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
            Programar Funcion
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="closeModal('newScreeningModal')"
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
            <div class="select_box w-full max-w-80">
              <span>Sala</span>
              <select class="" v-model="this.cinemaRoomNewScreening">
                <option v-for="sala in this.cinemaRoomsInDB" :value="sala.sala">
                  {{ sala.sala }}
                </option>
              </select>
            </div>

            <div class="input_box w-full max-w-80">
              <input type="time" v-model="this.hourNewScreening" />
              <span>Horario</span>

              <svg
                class="absolute top-1/2 right-[12px] transform -translate-y-1/2 pointer-events-none w-[18px] h-[18px] text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <div class="input_box w-full max-w-80">
              <input type="date" v-model="this.dateNewScreening" />
              <span>Fecha</span>
            </div>

            <div class="select_box w-full max-w-80">
              <span>Peliculas</span>
              <select v-model="this.movieNewScreening">
                <option v-for="pelicula in this.moviesInTheater" :value="pelicula.id">
                  {{ pelicula.title }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex flex-col items-center space-y-4">
            <PrimaryButton
              class="btn-width boton_crear_funcion"
              @click="createFunction"
              :disabled="this.disenabledButton"
            >
              Crear Funcion
            </PrimaryButton>
            <div
              v-if="this.errorCreateScreening"
              class="p-4 text-md text-red-800 rounded-lg bg-red-200"
              role="alert"
            >
              <span class="font-semibold">{{ this.msjErrorCreateScreening }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


@media (min-width: 768px) { 
  
 }
</style>
