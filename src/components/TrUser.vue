<script>
import axios from "axios";
import { usrStore } from "../components/store/usrStore";
import { Modal } from "flowbite";

import DangerButtonModal from "./buttons/DangerButtonModal.vue";
import PrimaryButtonModal from "./buttons/PrimaryButtonModal.vue";

export default {
  data() {
    return {
      usrStore: usrStore(),

      modalInstances: {},
      scrollbarWidth: 0,

      disenabledButtons: false,
    };
  },
  components: {
    PrimaryButtonModal,
    DangerButtonModal,
  },
  emits: ["reloadUsers"],
  props: ["user"],
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

      this.modalInstances.editModal = new Modal(
        this.$refs.editModal,
        options,
        instanceOptions
      );
      this.modalInstances.enableDisableModal = new Modal(
        this.$refs.enableDisableModal,
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
    capitalizeFirstLetter(string) {
      if (string) {
        string = string.charAt(0).toUpperCase() + string.slice(1);
      }
      return string;
    },
    async enableUser(userId) {
      this.disenabledButtons = true;
      const url = "http://localhost:8080/usuario/enableUser";
      const data = {
        idUsuario: userId,
      };
      try {
        await axios.post(url, data, { withCredentials: true });
        this.$emit("reloadUsers");
        alert("El Usuario a sido habilitado correctamente");

        this.closeModal("enableDisableModal");
      } catch (error) {
        console.log(error);
      }
      this.disenabledButtons = false;
    },
    async disableUser(userId) {
      this.disenabledButtons = true;
      const url = "http://localhost:8080/usuario/disableUser";
      const data = {
        idUsuario: userId,
      };
      try {
        await axios.post(url, data, { withCredentials: true });
        this.$emit("reloadUsers");
        alert("El usuario a sido desabilitado correctamente");

        this.closeModal("enableDisableModal");
      } catch (error) {
        console.log(error);
      }
      this.disenabledButtons = false;
    },
    async removeAdminRole(userId) {
      this.disenabledButtons = true;
      const url = "http://localhost:8080/usuario/removeAdmin";
      const data = {
        idUsuario: userId,
      };
      try {
        await axios.post(url, data, { withCredentials: true });
        alert("Rol de administrador revocado");
        this.$emit("reloadUsers");

        this.closeModal("editModal");
      } catch (error) {
        console.log(error);
      }
      this.disenabledButtons = false;
    },
    async grantAdminRole(userId) {
      this.disenabledButtons = true;
      const url = "http://localhost:8080/usuario/grantAdmin";
      const data = {
        idUsuario: userId,
      };
      try {
        await axios.post(url, data, { withCredentials: true });
        alert("Rol de administrador concedido");
        this.$emit("reloadUsers");

        this.closeModal("editModal");
      } catch (error) {
        console.log(error);
      }
      this.disenabledButtons = false;
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
    <td class="data-cell" data-cell="Nombre: ">{{ user.nombre }} {{ user.apellido }}</td>
    <td class="data-cell" data-cell="Email: ">{{ user.email }}</td>
    <td class="data-cell" data-cell="Rol: ">
      {{ this.capitalizeFirstLetter(user.Rol.rol) }}
    </td>
    <td class="data-cell" data-cell="Estado: ">
      <span class="green" v-if="user.habilitado"> Activo </span>
      <span class="red" v-else> Inactivo </span>
    </td>
    <td class="text-center">
      <div class="icon icon_resaltable mr-0.5" @click="openModal('editModal')">
        <i class="bi bi-pencil-square"></i>
      </div>

      <div
        v-if="user.habilitado && user.idUsuario != this.usrStore.currentUser.idUsuario"
        class="icon icon_resaltable red ml-0.5"
        @click="openModal('enableDisableModal')"
      >
        <i class="bi bi-trash3-fill"></i>
      </div>

      <div
        v-else-if="!user.habilitado"
        class="icon icon_resaltable green ml-0.5"
        @click="openModal('enableDisableModal')"
      >
        <i class="bi bi-check"></i>
      </div>

      <div
        v-else-if="user.idUsuario == this.usrStore.currentUser.idUsuario"
        class="icon ml-0.5"
      >
        <i class="bi bi-person-circle"></i>
      </div>
    </td>
  </tr>

  <!-- Edit Modal -->
  <div
    ref="editModal"
    id="editModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
  >
    <div class="relative p-4 w-full max-w-xl max-h-full mt-12 md:mt-20">
      <div class="relative rounded-lg shadow bg-zinc-800">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Detalles De Usuario
          </h3>

          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="closeModal('editModal')"
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
        <div class="p-4 md:p-5 space-y-1">
          <p class="text-base leading-relaxed text-gray-400">
            <b>Nombre:</b> {{ user.nombre }} {{ user.apellido }}
            <span v-if="user.idUsuario == this.usrStore.currentUser.idUsuario">
              (tu usuario)
            </span>
          </p>
          <p class="text-base leading-relaxed text-gray-400">
            <b>ID de Usuario:</b> {{ user.idUsuario }}
          </p>
          <p class="text-base leading-relaxed text-gray-400">
            <b>Email:</b> {{ user.email }}
          </p>
          <p class="text-base leading-relaxed text-gray-400">
            <b>Rol:</b> {{ user.Rol.rol }} <br />
          </p>
          <p
            class="text-base leading-relaxed text-gray-400 pt-2 font-semibold"
            v-if="!user.habilitado"
          >
            El usuario se encuentra inhabilitado
          </p>
        </div>

        <div
          class="flex justify-center p-4 md:p-5 border-t rounded-b border-gray-600 md:justify-start"
        >
          <DangerButtonModal
            :disabled="this.disenabledButtons"
            @click="removeAdminRole(user.idUsuario)"
            v-if="
              user.Rol.rol == 'admin' &&
              user.idUsuario != this.usrStore.currentUser.idUsuario
            "
          >
            Quitar Privilegios de Admin
          </DangerButtonModal>

          <PrimaryButtonModal
            :disabled="this.disenabledButtons"
            v-else-if="user.Rol.rol == 'user'"
            @click="grantAdminRole(user.idUsuario)"
          >
            Conceder Privilegios de Admin
          </PrimaryButtonModal>
        </div>
      </div>
    </div>
  </div>

  <!-- Enable/Disable Modal -->
  <div
    ref="enableDisableModal"
    id="enableDisableModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
  >
    <div
      v-if="user.idUsuario != this.usrStore.currentUser.idUsuario"
      class="relative p-4 w-full max-w-xl max-h-full mt-12 md:mt-20"
    >
      <div class="relative rounded-lg shadow bg-zinc-800">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
            <b v-if="user.habilitado"> Deshabilitar Usuario </b>
            <b v-else-if="!user.habilitado"> Habilitar Usuario </b>
          </h3>

          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="closeModal('enableDisableModal')"
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
            <span v-if="user.habilitado">
              Deseas deshabilitar la cuenta de este usuario?
            </span>
            <span v-else-if="!user.habilitado">
              Deseas habilitar la cuenta de este usuario?
            </span>
          </p>
        </div>

        <div
          class="flex justify-center p-4 md:p-5 border-t rounded-b border-gray-600 md:justify-start"
        >
          <DangerButtonModal
            :disabled="this.disenabledButtons"
            v-if="user.habilitado"
            @click="disableUser(user.idUsuario)"
          >
            Deshabilitar
          </DangerButtonModal>

          <PrimaryButtonModal
            :disabled="this.disenabledButtons"
            v-else-if="!user.habilitado"
            @click="enableUser(user.idUsuario)"
          >
            Habilitar
          </PrimaryButtonModal>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.icon {
  height: 100%;
  display: inline;
  font-size: 19px;
  padding: 6px 6px 4px 6px;
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
