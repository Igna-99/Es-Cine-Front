<script>
import { usrStore } from "../../components/store/usrStore";
import { navigateTo } from "../../../utils/navigateTo";
import PrimaryButton from "../../components/PrimaryButton.vue";
import DangerButton from "../../components/DangerButton.vue";

export default {
  components: {
    PrimaryButton,
    DangerButton
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

  <div v-else class="borde_doble tamaño_s">
    <div class="container_basic">
      <div class="container_flex gap_standar">
        <h1 class="neon-text title-menus">Detalles de Usuario</h1>
        <span>
          <b class="b_tag"> Nombre: </b> {{ this.usrStore.currentUser.nombre }}
          {{ this.usrStore.currentUser.apellido }}
        </span>

        <span> <b class="b_tag"> Email: </b> {{ this.usrStore.currentUser.email }} </span>

        <PrimaryButton v-if="this.usrStore.isAdmin" @click="navigateTo('adminMenu')"
          >Administrar
        </PrimaryButton>

        <DangerButton @click="salir"> Cerrar Sesion </DangerButton>
      </div>
    </div>
  </div>
</template>

<style scoped>


@media screen and (max-width: 620px) {
  .b_tag {
    display: block;
  }
}
</style>
