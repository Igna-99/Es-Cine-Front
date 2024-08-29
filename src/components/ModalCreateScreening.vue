<script>
import axios from "axios";

import { navigateTo } from "../../utils/navigateTo";
import PrimaryButton from "../components/PrimaryButton.vue"

export default {
  components: {
    PrimaryButton
  },
  data() {
    return {
      cinemaRoomsInDB: null,

      cinemaRoomNewScreening: null,
      hourNewScreening: null,
      dateNewScreening: null,
      movieNewScreening: null,

      errorCreateScreening: false,
      msjErrorCreateScreening: null,
    };
  },
  props: ["moviesInDB"],
  emits: ["reloadScreenings"],
  async created() {
    await this.loadCinemasRooms();
  },
  methods: {
    navigateTo,

    async loadCinemasRooms() {
      const url = "http://localhost:8080/sala/all";

      try {
        const response = await axios.get(url, { withCredentials: true });
        this.cinemaRoomsInDB = response.data.result;
      } catch (error) {
        console.log(error);
      }
    },

    async createFunction() {
      this.errorCreateScreening = false;

      const fechaActual = new Date(); 
      console.log(fechaActual);
      
      const fechaNFCompleta = new Date(this.dateNewScreening);

      console.log(fechaNFCompleta);
      

      if (
        this.cinemaRoomNewScreening == null ||
        this.hourNewScreening == null ||
        this.dateNewScreening == null ||
        this.movieNewScreening == null
      ) {
        this.errorCreateScreening = true;
        this.msjErrorCreateScreening = "Complete todos los campos";
      } else if (fechaActual > fechaNFCompleta) {
        this.errorCreateScreening = true;
        this.msjErrorCreateScreening =
          "La fecha de la Funcion debe ser posterior al dia de hoy";
      } else {
        const url = "http://localhost:8080/funcion";
        try {
          const data = {
            sala: this.cinemaRoomNewScreening,
            horario: this.hourNewScreening,
            fecha: this.dateNewScreening,
            idPelicula: this.movieNewScreening,
          };

          const response = await axios.post(url, data, { withCredentials: true });

          alert("La Funcion se a creado exitosamente");

          this.$router.push(`funcionesProgramadas`);
        } catch (error) {
          this.errorCreateScreening = true;
          this.msjErrorCreateScreening = error.response.data.message;

          console.error(error);
        }
      }
    },
  },
};
</script>

<template>
  <div
    style="backdrop-filter: blur(3px)"
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div
        class="modal-content container_basic container_flex gap_standar"
        style="background-color: #202020; border-radius: 3px"
      >
        <div class="neon-text-container" style="text-align: center">
          <h1 class="neon-text title-menus">Programar Funcion</h1>
        </div>

        <div class="form">
          <div class="select_box">
            <span>Sala</span>
            <select class="" v-model="this.cinemaRoomNewScreening">
              <option v-for="sala in this.cinemaRoomsInDB" :value="sala.sala">
                {{ sala.sala }}
              </option>
            </select>
          </div>

          <div class="input_box valido_estandar">
            <input type="time" v-model="this.hourNewScreening" />
            <span>Horario</span>
          </div>

          <div class="input_box valido_estandar">
            <input type="date" v-model="this.dateNewScreening" />
            <span>Fecha</span>
          </div>

          <div class="select_box">
            <span>Peliculas</span>
            <select v-model="this.movieNewScreening">
              <option v-for="pelicula in this.moviesInDB" :value="pelicula.id">
                {{ pelicula.title }}
              </option>
            </select>
          </div>

          <PrimaryButton class="btn-width boton_crear_funcion" @click="createFunction">
            Crear Funcion
          </PrimaryButton>

          <div v-if="this.errorCreateScreening" class="alert alert-danger tamaño_maximo">
            {{ this.msjErrorCreateScreening }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container_btns {
  margin-bottom: 30px;
}

.input_box {
  min-width: 300px;
}

.valido_estandar input:valid {
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.form{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 15px 0px;
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



@media screen and (max-width: 800px) {
  .select_box {
    height: 60px;
  }
}

@media screen and (max-width: 380px) {
  .select_box {
    width: 100%;
  }

  .input_box {
    width: 100%;
    min-width: 100px;
  }
}
</style>
