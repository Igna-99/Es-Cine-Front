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

  <div v-else class="container_borde borde_doble" >

    <div class="container_detalles margen1">
      <h1> <b> Usuarios Registrados </b> </h1>
    </div>

    <div v-for="usuario in this.todosLosUsuarios" class="container_detalles margen2 resaltable" >

      <span> {{ usuario.nombre }} {{ usuario.apellido }}  |  {{ usuario.email }} | Rol: '{{ usuario.Rol.rol }}'  </span> 

    </div>

  </div>
</template>



<script>
import axios from 'axios'
import { usrStore } from '../../../components/store/usrStore'

export default {
  data() {
    return {
      usrStore: usrStore(),
      todosLosUsuarios: null,
    }
  },
  created() {

    document.title = "Administrar Usuarios"

    this.traerTodosLosUsuarios()

  },
  updated() {

  },
  methods: {

    navegar(ubicacion) {
      this.$router.push(`/${ubicacion}`);
    },

    async traerTodosLosUsuarios() {

      const url = 'http://localhost:8080/usuario/all';

      try {
        const response = await axios.get(url, { withCredentials: true });

        this.todosLosUsuarios = response.data.result


      } catch (error) {
        console.log(error)
      }

    },

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

.margen1 {
  margin-bottom: 30px;
}

.margen2 {
  margin-top: 20px;
}

.resaltable:hover {
  background-color: rgba(170, 170, 170, 0.534);
  border-radius: 5px;
  cursor: pointer;
}
</style>