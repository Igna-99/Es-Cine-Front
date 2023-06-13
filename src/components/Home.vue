
<template>
  <div class="container">
    <input type="radio" name="slider" class="d-none" id="s1" checked>
    <input type="radio" name="slider" class="d-none" id="s2">
    <input type="radio" name="slider" class="d-none" id="s3">
    <input type="radio" name="slider" class="d-none" id="s4">
    <input type="radio" name="slider" class="d-none" id="s5">
    <div class="cards" id="cartas">
      <label :for="'s' + (index + 1)" :id="'slide' + (index + 1)" v-for="movie, index in popularMovies" :key="movie.id">
        <div class="card">
          <div class="image">
            <img :src="getMoviePoster(movie.poster_path)" alt="">
          </div>
          <div class="infos">
            <span class="name">{{ movie.title }}</span>
            <span class="lorem">{{ movie.release_date }}</span>
          </div>
          <button class="Btn" :data-id="`${movie.id}`">
            <div class="sign"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 18h-2v-6h-2v-2h4v8zm-1-9.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />
              </svg></div>
            <div class="text"><router-link :to="`/pelicula/${movie.id}`">INFORMACIÓN</router-link></div>
          </button>
        </div>
      </label>
    </div>

    <div class="divi">
      <div v-for="genre in genres" :key="genre.id">
        <div class="firstAnimation">
          <div class="secondAnimation">
            <router-link class="cartasgenero" :to="`/peliculasxgenero/${genre.id}`">
              <div class="genero">
                {{ genre.name }}
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  color: white !important;
  ;
}

.divi {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 40px;
  column-gap: 60px;
  margin-top: 50px;
}

@media (max-width: 1250px) {
  .divi {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 886px) {
  .divi {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .divi {
    grid-template-columns: repeat(1, 1fr);
  }
}


.cartasgenero {
  border-radius: 5px;
  height: 148px;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #fff;
  font-weight: 500;
  /*border: 1px solid #ffffff;*/
  background-color: rgb(41, 41, 41);
  box-shadow: rgba(0, 0, 0, 0.69) 0px 26px 30px -10px, rgba(0, 0, 0, 0.73) 0px 16px 10px -10px;
  font-family: "Montserrat", sans-serif;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.cartasgenero:hover {
  background: rgb(255, 255, 255);
  border-radius: 5px;
  background-color: #474747;
  transition: all .5s;
  color : black;
}

.secondAnimation {
  --hoverContorno: #959595;
}

.secondAnimation:hover,
.secondAnimation:focus {
  -webkit-animation: cardAnimacion 1.4s;
  animation: cardAnimacion 1.4s;
  box-shadow: 0 0 0 0.8em rgba(255, 255, 255, 0);
  border-radius: 5px;
}
@keyframes cardAnimacion {
  0% {
    box-shadow: 0 0 0 0 var(--hoverContorno);
  }
}
.genero {
  text-transform: uppercase;
  color: #ffe6ff;
  text-shadow: 0 0 0.6rem #ffffff, 0 0 1.5rem #dbdbdb,
    -0.2rem 0.1rem 1rem #aaaaaa, 0.2rem 0.1rem 1rem #777777,
    0 -0.5rem 2rem #414141, 0 0.5rem 3rem #131313;
}

.card .Btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: black;
}

.sign {
  width: 100%;
  transition-duration: .3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign svg {
  width: 100px;
}

.sign svg path {
  fill: white;
}

.text {
  position: absolute;
  right: 0%;
  width: 0%;
  opacity: 0;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  transition-duration: .3s;
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
}

.Btn:hover {
  width: 200px;
  border-radius: 40px;
  transition-duration: .7s;
}

.Btn:hover .sign {
  width: 30%;
  transition-duration: .7s;
  padding-left: 20px;
}

.Btn:hover .text {
  opacity: 1;
  width: 70%;
  transition-duration: .7s;
  padding-right: 10px;
}

.Btn:active {
  transform: translate(2px, 2px);
}

a {
  text-decoration: none;
}

input {
  display: none;
}

.container {
  position: relative;
  margin-top: 80px;
  width: 100%;
  height: 100%;
  max-width: 0px;
  display: flex;
  transform-style: preserve-3d;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.cards {
  position: relative;
  height: 500px;
  width: 430px;
  margin-bottom: 20px;
  perspective: 1000px;
  transform-style: preserve-3d;
  font-family: "Montserrat", sans-serif;
}

.cards label {
  position: absolute;
  width: 270px;
  left: 0;
  right: 0;
  margin: auto;
  cursor: pointer;
  transition: transform 0.55s ease;
}

.cards .card {
  position: relative;
  height: 490px;
  background-color: #494949;
  border-radius: 5px;
  padding: 25px 30px;
}

.cards .card:hover {
  transform: scale(1);
  transition-delay: 0.1s;
  background-color: #808080;
}

.card .image {
  display: flex;
  justify-content: space-between;
}

.card .image img {
  border-radius: 5px;
  box-shadow: 15px 15px 40px rgba(0, 0, 0, 50%);
  width: 100%;
  height: 300px;
}

.card .infos {
  display: block;
  text-align: center;
  padding-top: 15px;
}

.infos span {
  display: block;
}

.infos .name {
  color: var(--current-color1);
  transition: all .6s ease;
  font-size: 14px;
  font-weight: 800;
}

.infos .lorem {
  font-size: 13px;
  color: #ECEAED;
}


#s1:checked~.cards #slide4,
#s2:checked~.cards #slide5,
#s3:checked~.cards #slide1,
#s4:checked~.cards #slide2,
#s5:checked~.cards #slide3 {
  box-shadow: 0 15px 35px 0 rgba(0, 0, 0, 45%);
  transform: translate3d(-150%, 0, -220px);
  --current-color1: #000000;
  --current-color2: #000000;
}

#s1:checked~.cards #slide5,
#s2:checked~.cards #slide1,
#s3:checked~.cards #slide2,
#s4:checked~.cards #slide3,
#s5:checked~.cards #slide4 {
  box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 45%);
  transform: translate3d(-80%, 0, -120px);
  --current-color1: #000000;
  --current-color2: #000000;
}

#s1:checked~.cards #slide1,
#s2:checked~.cards #slide2,
#s3:checked~.cards #slide3,
#s4:checked~.cards #slide4,
#s5:checked~.cards #slide5 {
  box-shadow: 0 25px 50px 0 rgba(0, 0, 0, 50%);
  transform: translate3d(0, 0, 0);
  --current-color1: #ffffff;
  --current-color2: #000000;
}

#s1:checked~.cards #slide2,
#s2:checked~.cards #slide3,
#s3:checked~.cards #slide4,
#s4:checked~.cards #slide5,
#s5:checked~.cards #slide1 {
  box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 45%);
  transform: translate3d(80%, 0, -120px);
  --current-color1: #000000;
  --current-color2: #000000;
}

#s1:checked~.cards #slide3,
#s2:checked~.cards #slide4,
#s3:checked~.cards #slide5,
#s4:checked~.cards #slide1,
#s5:checked~.cards #slide2 {
  box-shadow: 0 15px 35px 0 rgba(0, 0, 0, 45%);
  transform: translate3d(150%, 0, -220px);
  --current-color1: #000000;
  --current-color2: #000000;
}
</style>


<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const fechaActual = new Date();
    const formato = fechaActual.toISOString().split('T')[0];
    const popularMovies = ref([]);
    const genres = ref([]);
    const buttonInfo = document.querySelectorAll('.Btn');

    async function fetchPopularMovies() {
      const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=6311677ef041038470aae345cd71bb78&primary_release_date.gte=${formato}&sort_by=popularity.desc&language=es`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("HOME: " + data.results)
        popularMovies.value = data.results.slice(0, 5);
      } catch (error) {
        console.error(error);
      }

    }
    async function fetchGnre() {
      const apiUrl2 = `https://api.themoviedb.org/3/genre/movie/list?api_key=6311677ef041038470aae345cd71bb78&language=es`;
      try {
        const response2 = await fetch(apiUrl2);
        const data2 = await response2.json();
        genres.value = data2.genres;
        console.log(data2.genres);
        console.log(genres.value);
      } catch (error) {
        console.error(error);
      }
    }

    buttonInfo.forEach(button => {
      button.addEventListener('click', () => {
        const peliculaId = button.dataset.id;
        window.location.href = `/Pelicula?id=${peliculaId}`;
      })
    });
    document.title = "Home"
    onMounted(fetchPopularMovies);
    onMounted(fetchGnre);

    function getMoviePoster(posterPath) {
      return `https://image.tmdb.org/t/p/w500/${posterPath}`
    }

    return {
      popularMovies,
      getMoviePoster,
      genres
    };


  }
};
</script>

