<template>
    <div class="movie-container">
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
            <h3 class="movie-title">{{ movie.title }}</h3>
            <img :src="getImageUrl(movie.poster_path)" alt="Poster de la película" />
            <p class="movie-overview">{{ movie.overview }}</p>
            <router-link to="/reserva" class="reserve-button">Reservar Asientos</router-link>
        </div>
    </div>
</template>
  
<script setup>
    import { ref, onMounted } from "vue";
    import { useRouter } from "vue-router";
    import axios from "axios";
    
    const router = useRouter();
    const movies = ref([]); // Array para almacenar las películas
    const movieLimit = 5; // Obtener solo 5 películas

    onMounted(async () => {
        const fechaActual = new Date();
        const formato = fechaActual.toISOString().split('T')[0];
        try {
            const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=6311677ef041038470aae345cd71bb78&primary_release_date.gte=${formato}&sort_by=popularity.desc&page=1&language=es`
            );
            const results = response.data.results.slice(0, movieLimit); // Obtener solo las primeras 5 películas
            movies.value = results;
        } catch (error) {
            console.error(error);
        }
    });

    const reserveSeats = () => {
        router.push("/reserva");
    };

    const getImageUrl = (posterPath) => {
        if (posterPath) {
            const baseUrl = "https://image.tmdb.org/t/p/w300"; // Base URL de las imágenes en TMDb
            return `${baseUrl}${posterPath}`;
        } else {
            return "";
        }
    }
</script>
  
<style scoped>

    h3, p {
        color: white!important;
    }
    .movie-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }
  
    .movie-card {
        border: 1px solid #ccc;
        padding: 10px;
        width: 350px;
    }
    
    .movie-title {
        color: #333;
        margin-bottom: 10px;
    }
    
    .movie-overview {
        color: #777;
        margin-bottom: 20px;
    }
    
    .reserve-button {
        background-color: #007bff;
        color: white;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        display: inline-block;
    }
    
    .reserve-button:hover {
        background-color: #0056b3;
    }
</style>