<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

import HomeSwiper from "../components/HomeSwiper.vue";

const popularMovies = ref([]);
const peliculas = ref([]);

document.title = "Cartelera"

const fetchPopularMovies = async () => {
  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular?language=es-AR&page=1&region=AR",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTA3ZGMwMjY1MTBhZWMyMjgxZDhkMThlMmU5N2U2NiIsInN1YiI6IjY1ZjVmNDM0NjY0NjlhMDE3ZTc5ODNiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c766nSZmKSJdOePx61K7cjSQ0LqDSnggRAQ0Teao9u8",
    },
  };

  try {
    const response = await axios.request(options);
    popularMovies.value = response.data.results.slice(0, 9);
  } catch (error) {
    console.error(error);
  }
};

const buscarPeliculas = async () => {

  const responseIdPeliculas = await axios.get(`http://localhost:8080/pelicula`);
  const idPelciulas = responseIdPeliculas.data.result;

  await idPelciulas.forEach(async (elemento) => {
    const idPelicula = elemento.idPelicula;

    const url = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=6311677ef041038470aae345cd71bb78&language=es`;

    try {
      let responsePelicula = await axios.get(url);

      peliculas.value.push(responsePelicula.data);

      peliculas.value.sort(function (a, b) {
        return a.id - b.id;
      });
    } catch (error) {
      console.log(error);
    }
  });
};

const getMoviePoster = (posterPath) => {
  return `https://image.tmdb.org/t/p/w500/${posterPath}`;
};

onMounted(() => {
  buscarPeliculas();
  fetchPopularMovies();
});
</script>

<template>
  <section class="section-swiper" v-if="popularMovies.length != 0">

    <div class="neon-text-container text-swiper">
      <h2 class="tittles-home neon-text">Proximamente</h2>
    </div>

    <HomeSwiper :movies="popularMovies" />

    <div class="neon-text-container text-cartelera">
      <h2 class="tittles-home neon-text ">Cartelera</h2>
    </div>

    <div class="cartelera-container">
      <router-link v-for="pelicula in peliculas" :key="pelicula.id" :to="`/pelicula/${pelicula.id}`" class="flip-card">

        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img :src="getMoviePoster(pelicula.poster_path)" alt="">
          </div>

          <div class="flip-card-back">
            <p class="titulomovie">{{ pelicula.title }}</p>
          </div>
        </div>

      </router-link>
    </div>

  </section>
</template>

<style scoped>
.text-swiper {
  margin: 20px 0;
}

.text-cartelera {
  margin: 30px 0;
}

.cartelera-container {
  margin: 50px 0px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-items: center;
  row-gap: 40px;
  column-gap: 25px;
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

@media (max-width: 1620px) {
  .cartelera-container {
    grid-template-columns: repeat(5, 1fr);
  }
}

@media (max-width: 1330px) {
  .cartelera-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1100px) {
  .cartelera-container {
    grid-template-columns: repeat(3, 1fr);
    column-gap: 0px;
  }
}

@media (max-width: 700px) {
  .neon-text {
    font-size: 2.8rem;
  }

  .cartelera-container {
    grid-template-columns: repeat(2, 1fr);

  }
}

@media (max-width: 400px) {
  .neon-text {
    font-size: 2.4rem;
  }

  .cartelera-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
