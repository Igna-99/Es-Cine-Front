<template>
  <div v-if="!this.usrStore.isLogged" class="borde_doble">
    <div class="container_basic">
      <h1>no estas logeado</h1>
    </div>
  </div>

  <div v-else-if="!this.usrStore.isAdmin" class="borde_doble">
    <div class="container_basic">
      <h1>Acesso Denegado</h1>
    </div>
  </div>

  <div v-else class="borde_doble tamaño_l">

    <div class="container_basic container_flex">

      <h1> <b> Administrar Funciones </b> </h1>

      <button class="elemento_flotante btn_basic" @click="navigateTo('menuAdministracion')"> Regresar </button>

      <div class="container_btns">
        <button type="submit" class="btn_basic " @click="navigateTo('funcionesProgramadas')"> Funciones Programadas
        </button>
        <button type="submit" class="btn_basic activado">Programar Funciones</button>
      </div>

    </div>
    <!-- Programar Funciones -->
    <div>
      <div class="container_basic container_flex form_funcion">

        <div class="select_box">

          <span>Sala</span>
          <select class="" v-model="this.salaNF">
            <option v-for="sala in this.salasInDB" :value="sala.sala"> {{ sala.sala }} </option>
          </select>

        </div>

        <div class="input_box valido_estandar">
          <input type="time" v-model="this.horarioNF">
          <span>Horario</span>
        </div>

        <div class="input_box valido_estandar">
          <input type="date" v-model="this.fechaNF">
          <span>Fecha</span>
        </div>

        <div class="select_box">
          <span>Peliculas</span>
          <select v-model="this.peliculaNF">
            <option v-for="pelicula in this.moviesInDB" :value="pelicula.id"> {{ pelicula.title }} </option>
          </select>
        </div>

        <button class="btn_basic boton_crear_funcion" @click="createFunction"> Crear Funcion</button>

        <div v-if="this.error" class="alert alert-danger tamaño_maximo">
          {{ this.msjError }}
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import { usrStore } from '../../components/store/usrStore'
import { navigateTo } from '../../../utils/navigateTo'
import { loadMoviesFromDB } from '../../../utils/funcionsMovieDB'

export default {
  data() {
    return {
      usrStore: usrStore(),
      moviesInDB: [],
      salasInDB: null,

      salaNF: null,
      horarioNF: null,
      fechaNF: null,
      peliculaNF: null,

      error: false,
      msjError: null,
    }
  },
  async created() {

    document.title = "Administrar Funciones";
    await this.loadMovies();
    await this.loadCinemasRooms();
  },
  updated() {

  },
  methods: {
    navigateTo,

    async loadMovies() {
      this.moviesInDB = await loadMoviesFromDB();
    },

    async loadCinemasRooms() {
      const url = 'http://localhost:8080/sala/all';

      try {
        const response = await axios.get(url, { withCredentials: true });
        this.salasInDB = response.data.result

      } catch (error) {
        console.log(error)
      }
    },

    async createFunction() {

      this.error = false;

      const fechaActual = new Date()
      const fechaNFCompleta = new Date(this.fechaNF)

      if (this.salaNF == null || this.horarioNF == null || this.fechaNF == null || this.peliculaNF == null) {

        this.error = true;
        this.msjError = "Complete todos los campos";

      } else if (fechaActual > fechaNFCompleta) {

        this.error = true;
        this.msjError = "La fecha de la Funcion debe ser posterior al dia de hoy";

      } else {

        const url = 'http://localhost:8080/funcion';
        try {
          const data = {
            sala: this.salaNF,
            horario: this.horarioNF,
            fecha: this.fechaNF,
            idPelicula: this.peliculaNF,
          };

          const response = await axios.post(url, data, { withCredentials: true });

          alert("La Funcion se a creado exitosamente")

          this.$router.push(`funcionesProgramadas`);

        } catch (error) {

          this.error = true;
          this.msjError = error.response.data.message

          console.error(error)

        }
      }
    },

  },
}

</script>

<style scoped>
.container_basic {
  gap: 15px;
}

.container_basic h1 {
  margin-top: 35px;
}

.container_detalles span {
  margin: 0px;
}

.input_box {
  min-width: 300px;
}

.activado {
  font-weight: bold;
  color: black;
  border: 2px solid black;
  background-color: rgba(255, 255, 255, 0.753);
}

.form_funcion {
  margin-top: 15px;
  padding-top: 35px;
}

.valido_estandar input:valid {
  border: 1px solid rgba(255, 255, 255, 0.25);
}

/* estilo Selects */
.select_box {
  display: flex;
  justify-content: center;
  position: relative;
  width: 300px;
  height: 50px;
}

.select_box select {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: #202020;
  border-radius: 1px;
  outline: none;
  color: white;
  font-size: 1em;

}

.select_box span {
  position: absolute;
  left: 0;
  pointer-events: none;
  color: rgba(255, 255, 255, 0.25);
  text-transform: uppercase;
  transition: 0.4s;
  color: white;
  transform: translateX(10px) translateY(-7px);
  font-size: 0.65em;
  padding: 0 10px;
  background: #202020;
  border-left: 1px solid white;
  border-right: 1px solid white;
  letter-spacing: 0.2em;
}


.boton_crear_funcion {
  margin-top: 20px;
  width: 250px;
}

@media screen and (max-width:800px) {
  .select_box {
    height: 60px;
  }
}

@media screen and (max-width:380px) {
  .select_box {
    width: 100%;
  }

  .input_box{
    width: 100%;
    min-width: 100px;
  }
}
</style>