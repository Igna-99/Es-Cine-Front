<script>
import axios from "axios";
import { usrStore } from "./store/usrStore";

import DangerButtonModal from "./buttons/DangerButtonModal.vue";

export default {
  data() {
    return {
      usrStore: usrStore(),
      modalInstances: {},

      disenabledButton: false
    };
  },
  components: {
    DangerButtonModal,
  },
  emits: ["reloadScreenings"],
  props: ["function", "tittle"],
  methods: {
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

      this.modalInstances.deleteScreeningModal = new Modal(
        this.$refs.deleteScreeningModal,
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

    async deleteFunction(idFunction) {
      const url = "http://localhost:8080/funcion/delete";

      const data = {
        idFuncion: idFunction,
      };

      this.disenabledButton = true

      try {
        await axios.post(url, data, { withCredentials: true });
        alert("Funcion Eliminada Correctamente");
        this.$emit("reloadScreenings");

      } catch (error) {
        console.error(error);
      }
      this.closeModal("deleteScreeningModal");
      this.disenabledButton = false
    },
    stripSeconds(string) {
      let strips = string.split(":");
      return `${strips[0]}:${strips[1]}`;
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
  <tr class="w-full h-[74px]">
    <td class="movie" data-cell="Pelicula: ">{{ this.tittle }}</td>
    <td class="sala" data-cell="Sala: ">{{ this.function.sala }}</td>
    <td class="rol" data-cell="Horario: ">
      {{ this.stripSeconds(this.function.horario) }}
    </td>
    <td class="md:text-right">
      <div class="icon icon_resaltable red" @click="openModal('deleteScreeningModal')">
        <i class="bi bi-trash3-fill"></i>
      </div>
    </td>
  </tr>

  <div
    ref="deleteScreeningModal"
    id="deleteScreeningModal"
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
            Eliminar Funcion
          </h3>

          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="closeModal('deleteScreeningModal')"
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
        <div class="p-4 md:p-5 space-y-4">
          <p
            class="text-pretty text-base leading-relaxed text-gray-500 dark:text-gray-400"
          >
            Deseas Eliminar La Funcion #{{ this.function.idFuncion }} de
            <b> {{ this.tittle }} </b> ( {{ this.function.fecha }} - Sala
            {{ this.function.sala }} )
          </p>
        </div>
        <!-- Modal footer -->
        <div
          class="flex justify-center p-4 md:p-5 border-t rounded-b border-gray-600 md:justify-start"
        >
          <DangerButtonModal @click="deleteFunction(this.function.idFuncion)" :disabled="this.disenabledButton">
            Eliminar
          </DangerButtonModal>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.name,
.email {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.icon {
  display: inline;
  font-size: 20px;
  padding: 6px 6px 4px 6px;
  margin: 0px 5px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
}

.icon_resaltable:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.3);
}

.red {
  color: rgb(141, 2, 2);
}

.green {
  color: rgb(2, 141, 32);
}
</style>
