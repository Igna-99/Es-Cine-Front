<script>
import { usrStore } from '../../components/store/usrStore'
import PrimaryButton from '../../components/PrimaryButton.vue'


export default {
  components: {
    PrimaryButton
  },
  data() {
    return {
      usrStore: usrStore()
    }
  },
  created() {
    if (!this.usrStore.isLogged) {
      this.$router.push("/login");
    }

    document.title = "Detalles"

  },
  updated() {

    if (!this.usrStore.isLogged) {
      this.$router.push("/login");
    }
  },
  methods: {

    salir() {
      this.usrStore.logOut()
      this.$router.push('/login');
    },

    navegar(ubicacion) {
      this.$router.push(`/${ubicacion}`);
    }
  },
}

</script>

<template>

  <div v-if="!this.usrStore.isLogged" class="borde_doble">
    <div class="container_basic">
      <h1>no estas logeado</h1>
    </div>
  </div>

  <div class="borde_doble tamaño_s" v-else>

    <div class="container_basic container_flex">

      <div class="neon-text-container">
        <h1 class="neon-text">Detalles de Usuario</h1>
      </div>

      <span>
        <b class="b_tag"> Nombre: </b> {{ this.usrStore.currentUser.nombre }} {{ this.usrStore.currentUser.apellido }}
      </span>

      <span>
        <b class="b_tag"> Email: </b> {{ this.usrStore.currentUser.email }}
      </span>

      <PrimaryButton v-if="this.usrStore.isAdmin" @click="navegar('menuAdministracion')">
        Administrar
      </PrimaryButton>

      <PrimaryButton @click="salir">
        Cerrar Sesion
      </PrimaryButton>

    </div>

  </div>
</template>

<style scoped>
.neon-text-container h1 {
  margin: 10px 0px;
}

.container_basic {
  gap: 15px;
}

@media screen and (max-width:620px) {
  .b_tag {
    display: block;
  }

}
</style>