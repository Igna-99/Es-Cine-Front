<template>
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

<style>
.back {
  margin-top: 65px;
  background-color: transparent !important;
  border: none;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
}

.back svg {
  width: 100px;
}


.sign svg {
  width: 100px;
}

.sign svg path {
  fill: white;
}

.gri {
  margin-top: 65px;
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
  border-radius: 1rem;
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
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.2);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 1px solid rgb(253, 253, 253);
  border-radius: 1rem;
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
      loading: true
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.buscarPeliculas();
  },
  methods: {
    buscarPeliculas() {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=6311677ef041038470aae345cd71bb78&with_genres=${this.id}`;

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
  }
};
</script>