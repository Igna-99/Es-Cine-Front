<template>
  <div class="genreName">{{ this.genreName }} </div>
  <div class="gri">
    <div v-for="pelicula in peliculas" :key="pelicula.id">
      <router-link :to="`/pelicula/${pelicula.id}`">
        <div class="flip-card">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img :src="getMoviePoster(pelicula.poster_path)" alt="">
            </div>
            <div class="flip-card-back">
              <p class="titulomovie">{{ pelicula.title }}</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.genreName{
  margin: 0;
  justify-content: center;
  display: flex;
  color:white;
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 700;
  background-clip: text; /* sin background-clip el -webkit-background-clip tira error ¯\_(ツ)_/¯ */
  overflow: hidden;
  background: linear-gradient(90deg, #000, #fff, #000);
  background-repeat: no-repeat;
  background-size: 80%;
  animation: animate 4s linear infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: rgba(255, 255, 255, 0);
}

@keyframes animate {
  0% {
    background-position: -200%;
  }
  100% {
    background-position: 200%;
  }
}

.back {
  margin-top: 50px;
  background-color: transparent !important;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
}

.gri {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 40px;
  column-gap: 60px
}

@media (max-width: 1250px) {
  .gri {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 960px) {
  .gri {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 680px) {
  .gri {
    grid-template-columns: repeat(2, 1fr);
  }
}

.flip-card-front img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 5px;
}

.flip-card {
  background-color: transparent;
  width: 190px;
  height: 254px;
  perspective: 1000px;
}

.titulomovie {
  text-align: center;
  margin: 0;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  box-shadow: 0px 20px 14px 0 rgba(0, 0, 0, 0.404);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  /*border: 1px solid rgb(253, 253, 253);*/
  border-radius: 5px;
}


.flip-card-back {
  color: white;
  background-color: black;
  font-family: "Montserrat", sans-serif;
  transform: rotateY(180deg);
}
</style>
<script>

export default {
  data() {
    return {
      id: '',
      peliculas: [],
      genreName: ''
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.buscarPeliculas();
    this.traerNombre();
  },
  methods: {
    buscarPeliculas() {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=6311677ef041038470aae345cd71bb78&with_genres=${this.id}&language=es`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log("PeliculaGenero: " + url);
          this.peliculas = data.results;
          console.log("PeliculaGenero resultado: " + this.peliculas);

          this.loading = false;
        })
        .catch(error => {
          console.error('Error al buscar películas:', error);
        });
    },
    getMoviePoster(posterPath) { return `https://image.tmdb.org/t/p/w500/${posterPath}` },

    traerNombre(){
      const url2 = `https://api.themoviedb.org/3/genre/movie/list?api_key=6311677ef041038470aae345cd71bb78&language=es`;
      fetch(url2)
        .then(response => response.json())
        .then(data => {
          const genre = data.genres.find(genre => genre.id === parseInt(this.id));
          if (genre) {
            this.genreName = genre.name;
            document.title = genre.name ;

          } else {
            this.genreName = 'Género no encontrado';
          }
          console.log("GENERO NOMBER" + this.genreName)

        })
        .catch(error => {
          console.error('Error en buscar nombre:', error);
        });
    },
  }
};
</script>