<template>
  <div v-if="this.usrStore.isLogged" class="container_borde borde_doble">
    
    <div class="titulo">
      <h1>Reservas De Usuario</h1>
    </div>

    <div class="container" v-for="reserva in this.usrStore.reservasDeUser">
      <h6 class="tituloID">Reserva #{{ reserva.idReserva }}</h6>
      <h6 class="tituloID">Sala '{{ reserva.Funcion.sala }}'</h6>
      <h6 class="tituloID">Horario {{ this.formatTime(reserva.Funcion.horario) }}</h6>
      <h6 class="tituloID">Fecha {{ reserva.Funcion.fecha }}</h6>
      <h6 class="tituloID">pelicula id #{{ reserva.Funcion.idPelicula }}</h6>
      <h6 class="tituloID">asiento: {{ reserva.AsientosDeFuncions[0].numeroAsiento }}</h6>

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
  methods: {

    formatTime(hora) {
      return hora.substring(0, 5);
    },

  },
  created() {

    document.title = "Reservas";
    this.usrStore.cargarReservas();

  },
}
</script>


<style scoped>

.titulo{
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px auto;
  padding: 20px 80px;
  position: relative;
  color: #fff;
  background-color: #202020;
  overflow: hidden;
  max-width: 100%;
  z-index: 1;
  font-family: "Montserrat", sans-serif;
  max-width: 800px;
}
.titulo h1{
  margin: 0px auto;
}

.container {
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px auto 0px;
  padding: 20px 80px;
  position: relative;
  color: #fff;
  background-color: #202020;
  overflow: hidden;
  max-width: 100%;
  z-index: 1;
  font-family: "Montserrat", sans-serif;
  max-width: 800px;
}

.tituloID {
  text-align: right;
  display: flex;
  margin: 0;
}
</style>