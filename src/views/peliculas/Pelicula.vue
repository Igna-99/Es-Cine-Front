<script>
import axios from "axios";

export default {
  data() {
    return {
      idPelicula: this.$route.params.idPelicula,
      pelicula: null,
      funcionesSeleccionadas: null,
      funcionesAll: null,
      fechas: null,
      fechaSeleccionada: null,
    };
  },
  created() {
    this.buscarPelicula();
    this.traerFuncionesDePelicula();
  },
  methods: {
    async buscarPelicula() {
      try {
        const url = `https://api.themoviedb.org/3/movie/${this.idPelicula}?api_key=6311677ef041038470aae345cd71bb78&language=es`;
        const response = await axios.get(url);
        this.pelicula = response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async traerFuncionesDePelicula() {
      try {
        const url = `http://localhost:8080/funcion/pelicula/${this.idPelicula}`;
        const response = await axios.get(url);

        this.funcionesAll = response.data.funcionesPorFecha;
        this.fechas = Object.keys(this.funcionesAll);
      } catch (error) {
        console.error(error.message);
      }
    },

    getMoviePoster(posterPath) {
      return `https://image.tmdb.org/t/p/w500/${posterPath}`;
    },

    getMovieBackdrop(backdrop_path) {
      return `https://image.tmdb.org/t/p/w1280/${backdrop_path}`;
    },

    formatTime(hora) {
      return hora.substring(0, 5);
    },

    formatRuntime(minutos) {
      const horas = Math.floor(minutos / 60);
      const remainingMinutes = minutos % 60;
      return `${horas}h ${remainingMinutes}min`;
    },

    formatDate(dateString) {
      var dateParts = dateString.split("-");
      var formattedDate =
        dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0].slice(-2);
      return formattedDate;
    },

    getGenresString(genres) {
      var listaGenres = [];
      for (var i = 0; i < genres.length; i++) {
        listaGenres.push(genres[i].name);
        var genresString = listaGenres.join(", ");
      }
      return genresString;
    },

    seleccionarDia(fecha) {
      this.fechaSeleccionada = fecha;
      this.funcionesSeleccionadas = this.funcionesAll[fecha];
    },
  },
};
</script>

<template>
  <div v-if="this.pelicula != null">
  
    <div class="poster-container">
      <div class="card">
        <div class="content">
          <div class="back">
            <div class="back-content">
              <img :src="getMoviePoster(pelicula.poster_path)" alt="Poster" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-container">
      <p class="movie-title">{{ pelicula.title }}</p>
      <p class="datos">
        {{ formatDate(pelicula.release_date) }} · {{ formatRuntime(pelicula.runtime) }} ·
        {{ getGenresString(pelicula.genres) }}
      </p>
      <div class="overview">{{ pelicula.overview }}</div>

      <div v-if="this.funcionesAll != null">
        <p class="movie-title">Funciones</p>

        <div class="text-center">
          <button
            v-for="fecha in this.fechas"
            type="button"
            class="btn_basic"
            style="margin: 5px"
            @click="seleccionarDia(fecha)"
          >
            {{ fecha }}
          </button>
        </div>

        <p class="movie-title">{{ this.fechaSeleccionada }}</p>

        <div
          class="container-funciones text-center"
          v-for="funcion in this.funcionesSeleccionadas"
        >
          <p class="tituloID">SALA : {{ funcion.sala }}</p>
          <p class="tituloID">HORARIO : {{ this.formatTime(funcion.horario) }} hs</p>
          <router-link :to="`/funcion/${funcion.idFuncion}`" class="btn_basic"
            >RESERVAR ASIENTOS</router-link
          >
        </div>
      </div>

      <div v-else>
        <p class="movie-title">Sin Funciones Programadas</p>
      </div>
    </div>

    <img class="backdrop" :src="getMovieBackdrop(pelicula.backdrop_path)" alt="Poster" />
  </div>
</template>

<style scoped>





.info-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 90%;
  margin: -10% auto 20px;
  padding: 3%;
  padding-top: 10%;
  gap: 10px;
  
  background-color: #1d1d1de1;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 4px #000000;

  text-align: center;
}

.datos {
  color: rgb(163, 163, 163);
  font-weight: 500;

  text-wrap: balance;

}

.overview {
  color: rgb(247, 247, 247);
  font-weight: 400;

  display: flex;
  text-wrap: pretty;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background-size: cover;
  background-position: center;
  z-index: -2;
}

.movie-title {
  margin-top: 20px;
  font-size: 20px;
  color: white;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
}


/* dasdsadasd */






.poster-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  position: relative;
}

.poster-container .card {
  overflow: visible;
  width: 172px;
  height: 257px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 300ms;
  box-shadow: 0px 0px 10px 1px #000000ee;
  border-radius: 5px;
}

.back {
  background-color: black;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 5px;
  overflow: hidden;
}

.back {
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.back::before {
  position: absolute;
  content: " ";
  display: block;
  width: 160px;
  height: 160%;
  background: linear-gradient(
    90deg,
    transparent,
    #6d6d6d,
    #adadad,
    #d4d4d4,
    #ffffff,
    transparent
  );
  animation: rotation_481 5000ms infinite linear;
}

.back-content {
  position: absolute;
  width: 99%;
  height: 99%;
  border-radius: 5px;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}

.back-content img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 5px;
}

@keyframes rotation_481 {
  0% {
    transform: rotateZ(0deg);
  }

  0% {
    transform: rotateZ(360deg);
  }
}
</style>
