<template>

  <div v-if="!this.usrStore.isLogged" class="container_borde borde_doble">
    <div class="container_detalles">
      <h1>no estas logeado</h1>
    </div>
  </div>

  <div v-else-if="!this.usrStore.isAdmin" class="container_borde borde_doble">
    <div class="container_detalles">
      <h1>Acesso Denegado</h1>
    </div>
  </div>

  <div v-else class="container_borde borde_doble">

    <div class="container_detalles">
      <h1> <b> Administracion </b> </h1>
    </div>

    <div class="container_detalles" style="margin-top: 20px;">

      <button type="submit" class="btn_basic opcion" @click="navegar('administrarUsuarios')">Administrar Usuarios</button>

      <button type="submit" class="btn_basic opcion" @click="">Administrar Funciones</button>

      <button type="submit" class="btn_basic opcion" @click="navegar('administrarUsuarios')">Administrar Peliculas</button>

      <button type="submit" class="btn_basic opcion" @click="navegar('detallesUsuario')">Regresar</button>
    </div>

  </div>

</template>



<script>
import { usrStore } from '../../../components/store/usrStore'

export default {
  data() {
    return {
      usrStore: usrStore()
    }
  },
  created() {

    document.title = "Administracion"

  },
  updated() {

  },
  methods: {

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

.opcion{
 width: 90%; 
 height: 60px;
}


</style>