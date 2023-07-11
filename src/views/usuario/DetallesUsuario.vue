<template>
  <div class="container" v-if="this.usrStore.isLogged">
    <h1>Detalles de Usuario</h1>

    <span>Nombre: {{ this.usrStore.currentUser.nombre }} </span>

    <span>Apellido: {{ this.usrStore.currentUser.apellido }} </span>

    <span>Email: {{ this.usrStore.currentUser.email }} </span>

    <button type="submit" class="salir" @click="salir">Cerrar Sesion</button>

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
      this.$router.push("/login");
    }


  },


}

</script>



<style scoped>
.container {
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 20px 80px;
  position: relative;
  color: #fff;
  background-color: #202020;
  overflow: hidden;
  max-width: 100%;
  z-index: 1;
  font-family: "Montserrat", sans-serif;
}

.container button {
  width: 100%;
  padding: 10px;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-bottom: 15px;
  cursor: pointer;
}

.salir {
  background-color: #af4c4c;
}

.salir:hover {
  background-color: #b83939;
}
</style>