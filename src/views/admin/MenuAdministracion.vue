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
    document.title = "Administracion";
  },
  methods: {
    navigateTo,
  },
};
</script>

<template>
  <div v-if="!this.usrStore.isLogged" class="container_borde borde_doble">
    <div class="container_b asic">
      <h1>no estas logeado</h1>
    </div>
  </div>

  <div v-else-if="!this.usrStore.isAdmin" class="container_borde borde_doble">
    <div class="container_basic">
      <h1>Acesso Denegado</h1>
    </div>
  </div>

  <div v-else class="borde_doble tamaño_xs">
    <div class="container_basic">
      <div class="container_flex gap_standar">
        <div class="neon-text-container">
          <h1 class="neon-text title-menus">Administrar Cine</h1>
        </div>

        <PrimaryButton class="btn-width" @click="navigateTo('usuariosRegistrados')">
          Administrar Usuarios
        </PrimaryButton>

        <PrimaryButton class="btn-width" @click="navigateTo('funcionesProgramadas')">
          Administrar Funciones
        </PrimaryButton>

        <PrimaryButton class="btn-width" @click="navigateTo('peliculasEnCartelera')">
          Administrar Peliculas A Estrenar
        </PrimaryButton>

        <PrimaryButton class="btn-width" @click="navigateTo('peliculasEnCartelera')">
          Administrar Peliculas En Cartelera
        </PrimaryButton>

        <DangerButton class="btn-width" @click="navigateTo('usuario')"> Regresar </DangerButton>
      </div>
    </div>
  </div>
</template>

<style scoped>

.btn-width {
  width: 80%;
}

@media screen and (max-width: 540px) {
  .btn-width {
    width: 90%;
  }
}
</style>
