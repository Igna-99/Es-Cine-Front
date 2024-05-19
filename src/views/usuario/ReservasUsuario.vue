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

<template>
  <div class="container" v-if="!this.usrStore.isLogged">
    <h1>no estas logeado</h1>
  </div>

  <div v-else class="borde_doble tamaño_m">

    <div class="container_basic container_flex">
      <div class="neon-text-container">
        <h1 class="neon-text">Reservas De Usuario</h1>
      </div>
    </div>



    <div class="container_basic container_flex elemento_reserva" v-for="reserva in this.usrStore.reservasDeUser">
      <h6 class="info_reserva">Reserva #{{ reserva.idReserva }}</h6>
      <h6 class="info_reserva">Sala '{{ reserva.Funcion.sala }}'</h6>
      <h6 class="info_reserva">Horario {{ this.formatTime(reserva.Funcion.horario) }}</h6>
      <h6 class="info_reserva">Fecha {{ reserva.Funcion.fecha }}</h6>
      <h6 class="info_reserva">pelicula id #{{ reserva.Funcion.idPelicula }}</h6>
      <h6 class="info_reserva">asiento: {{ reserva.AsientosDeFuncions[0].numeroAsiento }}</h6>

    </div>

  </div>
</template>


<style scoped>
.neon-text-container h1{
    margin: 10px 0px;
}
.elemento_reserva {
  margin: 20px auto 0px;
}

.info_reserva {
  margin: 0;
}
</style>