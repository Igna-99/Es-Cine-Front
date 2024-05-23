<script>
import { usrStore } from "../../components/store/usrStore";
import { navigateTo } from "../../../utils/navigateTo";
import PrimaryButton from "../../components/PrimaryButton.vue";

export default {
  components: {
    PrimaryButton,
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
      <div class="neon-text-container">
        <h1 class="neon-text">Administracion</h1>
      </div>

      <div class="container_flex gap">
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.neon-text {
  margin: 30px 0px;
}

.gap {
  row-gap: 15px;
  padding-bottom: 15px;
}

.btn-width {
  width: 80%;
}

@media screen and (max-width: 640px) {
  .neon-text {
    font-size: 2.5rem;
  }
}

@media screen and (max-width: 540px) {
  .btn-width {
    width: 90%;
  }

  .neon-text {
    font-size: 1.85rem;
  }
}
</style>
