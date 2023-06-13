<template>
  <div class="movie-container">
    <div class="card">
      <div class="content">
        <div class="back">
          <div class="back-content">
            <img :src="getMoviePoster(pelicula.poster_path)" alt="Poster">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="info-container">
    <p class="movie-title">{{ pelicula.title }}</p>
    <p class="datos">{{ formatDate(pelicula.release_date) }} · {{ formatRuntime(pelicula.runtime) }} · {{
      getGenresString(pelicula.genres) }}</p>
    <div class="overview">{{ pelicula.overview }}</div>
  </div>
  <img class="backdrop" :src="getMovieBackdrop(pelicula.backdrop_path)" alt="Poster">
</template>
<script>
export default {
  data() {
    return {
      id: '',
      pelicula: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.buscarPelicula();
  },
  methods: {
    buscarPelicula() {
      const url = `https://api.themoviedb.org/3/movie/${this.id}?api_key=6311677ef041038470aae345cd71bb78&language=es`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.pelicula = data;
          console.log("PELICULA: " + this.pelicula)
        })
        .catch(error => {
          console.error('Error al buscar película:', error);
        });
    },
    getMoviePoster(posterPath) { return `https://image.tmdb.org/t/p/w500/${posterPath}` },
    getMovieBackdrop(backdrop_path) { return `https://image.tmdb.org/t/p/w1280/${backdrop_path}` },
    formatRuntime(minutos) {
      const horas = Math.floor(minutos / 60);
      const remainingMinutes = minutos % 60;
      return `${horas}h ${remainingMinutes}min`;
    },
    formatDate(dateString) {
      var dateParts = dateString.split("-");
      var formattedDate = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0].slice(-2);
      return formattedDate;
    },
    getGenresString(genres) {
      var listaGenres = [];
      for (var i = 0; i < genres.length; i++) {
        listaGenres.push(genres[i].name);
        var genresString = listaGenres.join(", ");
        console.log("GENEROS " + genres[i].name)
      }
      return genresString;
    },
  }
};
</script>

<style>
.info-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: #1d1d1de1;
  max-width: 70%;
  min-width: 350px;
  padding: 3%;
  padding-top: 10%;
  margin-top: -10%;
  position: relative;
  z-index: -1;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 4px #000000;

}

.datos {
  color: rgb(163, 163, 163);
  font-weight: 500;
  font-family: "Montserrat", sans-serif;
}

.overview {
  color: rgb(247, 247, 247);
  font-weight: 400;
  font-family: "Montserrat", sans-serif;
  display: flex;
  text-align: justify;
}

.backdrop {
  position: absolute;
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
  color: white;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
}

.movie-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.movie-container .card {
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

.front,
.back {
  background-color: #000000;
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
  content: ' ';
  display: block;
  width: 160px;
  height: 160%;
  background: linear-gradient(90deg, transparent, #6d6d6d, #adadad, #d4d4d4, #ffffff, transparent);
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

