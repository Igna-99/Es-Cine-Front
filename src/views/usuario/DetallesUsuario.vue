<template>

  <div class="container_borde borde_doble" v-if="this.usrStore.isLogged">

    <div class="container_detalles">
      <h1> <b> Detalles de Usuario </b> </h1>

      <span> <b> Nombre: </b> {{ this.usrStore.currentUser.nombre }} {{ this.usrStore.currentUser.apellido }} </span>

      <span> <b> Email: </b> : {{ this.usrStore.currentUser.email }} </span>

      <button v-if="this.usrStore.isAdmin" type="submit" class="btn_basic Administracion" @click="navegar('menuAdministracion')">Administrar</button>

      <button type="submit" class="btn_basic salir" @click="salir">Cerrar Sesion</button>
    </div>

  </div>

  <div class="container" v-else>

    <h1>no estas logeado</h1>

  </div>

</template>



<script>
import { usrStore } from '../../components/store/usrStore'

export default {
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

<style scoped>
.container_detalles {
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 30px 80px;
  position: relative;
  color: #fff;
  background-color: #202020;
  overflow: hidden;
  max-width: 100%;
  z-index: 1;
  font-family: "Montserrat", sans-serif;
}

.container_detalles span {
  margin: 0px;
}

.container_detalles h1 {
  margin: 25px;
}

.salir {
  width: 80%;
  border: 2px solid red;
  margin-bottom: 20px;

}

.salir:before {
  width: 50%;
}

.Administracion {
  width: 80%;
  border: 2px solid rgb(65, 65, 255);

}

.Administracion:before {
  width: 50%;
}
</style>