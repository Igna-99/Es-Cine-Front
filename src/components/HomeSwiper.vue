<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  EffectCoverflow,
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const props = defineProps(['movies'],)

const modules = [EffectCoverflow, Autoplay, Keyboard, Navigation, Pagination];

const getMoviePoster = (posterPath) => {
  return `https://image.tmdb.org/t/p/w500/${posterPath}`;
};

function navigateTo(ubicacion) {
  this.$router.push(`/${ubicacion}`);
}


</script>

<template>
  <swiper class="swiper custom-pagination" :effect="'coverflow'" :grabCursor="false" :centeredSlides="true"
    :initialSlide="Math.floor(movies.length / 2)" :slidesPerView="2" :breakpoints="{
    450: { slidesPerView: 3 },
    800: { slidesPerView: 4 },
    1200: { slidesPerView: 5 },
    1500: { slidesPerView: 6 },
  }" :autoplay="{
    delay: 360000,
    disableOnInteraction: false,
  }" :coverflowEffect="{
    rotate: 1,
  }" :navigation="true" :pagination="true" :modules="modules">
    <swiper-slide v-for="movie in movies" :key="movie.id" class="image-container swiper-slide">
      <router-link :to="`/pelicula/${movie.id}`">
        <img :src="getMoviePoster(movie.poster_path)" alt="Poster de la película" />
        <div class="overlay">
          {{ movie.title }}
        </div>
      </router-link>
    </swiper-slide>
  </swiper>

</template>


<style scoped>
.swiper {
  width: 100%;
  padding-bottom: 30px;
  user-select: none;
  margin: 0;
}

.image-container {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  /* Sombra para resaltar el elemento */
}

.image-container img {
  cursor: pointer;
  aspect-ratio: 2 / 3;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
  /* Transición suave para el efecto de oscurecimiento */
}

.image-container:hover img {
  filter: brightness(70%);
  /* Oscurecer la imagen al pasar el mouse */
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,
      0,
      0,
      0.3);
  /* Color de superposición semitransparente */
  opacity: 0;
  /* Inicialmente oculto */
  transition: opacity 0.3s ease;
  /* Transición suave para la opacidad */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  /* Sombra para mejorar la legibilidad del texto */
}

.image-container:hover .overlay {
  opacity: 1;
  /* Mostrar la superposición al pasar el mouse */
}

.custom-pagination {
  --swiper-pagination-color: rgba(255, 255, 255, 0.8);
  --swiper-pagination-bullet-inactive-color: rgba(109, 109, 109, 0.2);
  --swiper-pagination-bullet-inactive-opacity: 1;
  --swiper-pagination-bullet-size: 10px;
  --swiper-pagination-bullet-horizontal-gap: 6px;
}
</style>
