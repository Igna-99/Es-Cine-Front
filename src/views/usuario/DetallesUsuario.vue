<script>
import { usrStore } from "../../components/store/usrStore";
import { navigateTo } from "../../../utils/navigateTo";
import PrimaryButton from "../../components/buttons/PrimaryButton.vue";
import DangerButton from "../../components/buttons/DangerButton.vue";

export default {
  components: {
    PrimaryButton,
    DangerButton,
  },
  data() {
    return {
      usrStore: usrStore(),
    };
  },
  created() {
    if (!this.usrStore.isLogged) {
      this.$router.push({ name: "login" });
    }

    document.title = "Detalles";
  },
  updated() {
    if (!this.usrStore.isLogged) {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    navigateTo,
    salir() {
      this.usrStore.logOut();
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<template>
  <div v-if="!this.usrStore.isLogged" class="borde_doble">
    <div class="container_basic">
      <h1>no estas logeado</h1>
    </div>
  </div>

  <div v-else class="menus-border max-w-lg">
    <div class="container_basic gap-y-5 py-5">
      <h1 class="neon-text text-4xl text-center pb-2">Detalles de Usuario</h1>

      <div class="flex flex-col gap-y-2 sm"> 
        <span>
          <b class="block mb-1 sm:inline sm:mb-0"> Nombre: </b> {{ this.usrStore.currentUser.nombre }}
          {{ this.usrStore.currentUser.apellido }}
        </span>

        <span> <b class="block mb-1 sm:inline sm:mb-0"> Email: </b> {{ this.usrStore.currentUser.email }} </span>
      </div>

      <div class="flex flex-col gap-y-3"> 
        <PrimaryButton v-if="this.usrStore.isAdmin" @click="navigateTo('adminMenu')"
          >Administrar
        </PrimaryButton>

        <DangerButton @click="salir"> Cerrar Sesion </DangerButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
span {
  color: #fff;
}
</style>
