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

    <div class="container_detalles margen1">

      <button class="elemento_flotante btn_basic" @click="navegar('menuAdministracion')"> Regresar </button>

      <h1> <b> Administrar Funciones </b> </h1>

      <div class="botones">

        <button class="btn_basic activado"> Funciones Programadas </button>
        <button class="btn_basic" @click="navegar('programarFunciones')">Programar Funciones</button>

      </div>

    </div>

    <div class="container_detalles margen2">
      <div class="botones">
        <button class="btn_basic btn_fecha" @click="cambiarFecha(-1)" style="margin-right: 5px;"> Anterior</button>

        <div class="input_box">
          <input type="date" style="font-weight: bold; text-align: center;" v-model="this.fechaSeleccionada"
            @change="seleccionarFechaDeFuncion">
          <span>Fecha</span>
        </div>

        <button class="btn_basic btn_fecha" @click="cambiarFecha(1)" style="margin-left: 5px;"> Siguente</button>
      </div>
    </div>

    <div v-for="funcion in this.funcionesDeFechaSeleccionada" class="container_detalles margen2 resaltable">
      <span> Funcion #{{ funcion.idFuncion }} |  sala {{ funcion.sala }} | Horario {{ funcion.horario }} | {{
        this.tituloPelicula(funcion.idPelicula) }} </span>
    </div>

  </div>

</template>
  
<script>
import axios from 'axios'
import { usrStore } from '../../components/store/usrStore'

export default {
  data() {
    return {
      usrStore: usrStore(),

      peliculasInDB: [],

      funcionesInDB: null,
      fechaSeleccionada: null,
      funcionesDeFechaSeleccionada: null,

    }
  },
  async created() {

    document.title = "Administrar Funciones";
    await this.cargarFunciones();
    await this.cargarPeliculas();

    this.inicializarFecha();

  },

  updated() {

  },
  methods: {
    async cargarFunciones() {
      const url = 'http://localhost:8080/funcion/all';
      try {
        const response = await axios.get(url, { withCredentials: true });

        this.funcionesInDB = response.data.funcionesPorFecha
      } catch (error) {
        console.log(error)
      }

    },

    async cargarPeliculas() {

      const urlApiPeliculas = 'http://localhost:8080/pelicula'

      try {

        const response = await axios.get(urlApiPeliculas, { withCredentials: true });
        let idPeliculas = response.data.result

        for (let index = 0; index < idPeliculas.length; index++) {
          const idPelicula = idPeliculas[index].idPelicula;

          const urlMovieDB = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=6311677ef041038470aae345cd71bb78&language=es`;
          let responsePelicula = await axios.get(urlMovieDB);
          this.peliculasInDB.push(responsePelicula.data)
        }

      } catch (error) {
        console.log(error)
      }

    },

    navegar(ubicacion) {
      this.$router.push(`/${ubicacion}`);
    },

    inicializarFecha() {

      const date = new Date()
      this.fechaSeleccionada = date.toISOString().slice(0, 10);

      this.seleccionarFechaDeFuncion()
    },

    seleccionarFechaDeFuncion() {
      this.funcionesDeFechaSeleccionada = this.funcionesInDB[this.fechaSeleccionada]
    },

    tituloPelicula(id) {

      let index = 0
      let encontrado = false
      let resultado = "null"

      while (index < this.peliculasInDB.length && !encontrado) {
        if (this.peliculasInDB[index].id == id) {
          resultado = this.peliculasInDB[index].title
          encontrado = true
        } else {
          index++
        }
      }

      return resultado
    },

    cambiarFecha(dias) {

      let fechaAux = new Date(this.fechaSeleccionada);

      fechaAux.setDate(fechaAux.getDate() + dias);

      this.fechaSeleccionada = fechaAux.toISOString().slice(0, 10);

      this.seleccionarFechaDeFuncion()

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
  min-width: 100%;
  z-index: 1;
  font-family: "Montserrat", sans-serif;
}

.container_detalles span {
  margin: 0px;
}

.container_detalles h1 {
  margin: 25px;
}

.botones {
  display: flex;
  justify-content: center;
}

.activado {
  font-weight: bold;
  color: black;
  border: 2px solid black;
  background-color: rgba(255, 255, 255, 0.753);
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