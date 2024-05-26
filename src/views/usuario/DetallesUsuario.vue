<script>
import { usrStore } from "../../components/store/usrStore";
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
    if (!this.usrStore.isLogged) {
      this.$router.push("/login");
    }

    document.title = "Detalles";
  },
  updated() {
    if (!this.usrStore.isLogged) {
      this.$router.push("/login");
    }
  },
  methods: {
    salir() {
      this.usrStore.logOut();
      this.$router.push("/login");
    },

    navegar(ubicacion) {
      this.$router.push(`/${ubicacion}`);
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
      <div class="neon-text-container">
        <h1 class="neon-text title-menus">Detalles de Usuario</h1>
      </div>

      <div class="container_flex gap">
        <span>
          <b class="b_tag"> Nombre: </b> {{ this.usrStore.currentUser.nombre }}
          {{ this.usrStore.currentUser.apellido }}
        </span>

        <span> <b class="b_tag"> Email: </b> {{ this.usrStore.currentUser.email }} </span>

        <PrimaryButton
          v-if="this.usrStore.isAdmin"
          @click="navegar('menuAdministracion')"
        >
          Administrar
        </PrimaryButton>

        <PrimaryButton @click="salir"> Cerrar Sesion </PrimaryButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container_flex {
  gap: 15px;
  padding-bottom: 15px;
}

@media screen and (max-width: 620px) {
  .b_tag {
    display: block;
  }
}
</style>
