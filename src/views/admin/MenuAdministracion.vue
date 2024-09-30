<script>
import { usrStore } from "../../components/store/usrStore";
import { navigateTo } from "../../../utils/navigateTo";
import PrimaryButton from "../../components/buttons/PrimaryButton.vue";
import DangerButton from "../../components/buttons/DangerButton.vue";

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

  <div v-else class="menus-border max-w-lg">
    <div class="container_basic gap-y-4 py-5">

        <h1 class="neon-text text-4xl text-center pb-2">Administrar</h1>

        <PrimaryButton class="w-11/12 sm:w-4/5" @click="navigateTo('usuariosRegistrados')">
          Usuarios Registrados
        </PrimaryButton>

        <PrimaryButton class="w-11/12 sm:w-4/5" @click="navigateTo('administrarFunciones')">
          Administrar Funciones
        </PrimaryButton>

        <PrimaryButton class="w-11/12 sm:w-4/5" @click="navigateTo('PeliculasPorEstrenar')">
          Administrar Peliculas Por Estrenar
        </PrimaryButton>

        <PrimaryButton class="w-11/12 sm:w-4/5" @click="navigateTo('peliculasEnCartelera')">
          Administrar Peliculas En Cartelera
        </PrimaryButton>

        <DangerButton class="w-11/12 sm:w-4/5" @click="navigateTo('usuario')"> Regresar </DangerButton>
    </div>
  </div>
</template>
