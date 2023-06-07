<template>
    <div class="cinema-room">
      <h3>{{ movie.title }}</h3>
      <p>{{ movie.description }}</p>
      <router-link to="/reserva">Reservar Asientos</router-link>
    </div>
</template>
  
<script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import { useRouter } from "vue-router";
  
  const movie = ref({
    title: "",
    description: "",
  });
  
  const router = useRouter();
  
  onMounted(async () => {
    const fechaActual = new Date();
    const formato = fechaActual.toISOString().split('T')[0];
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=6311677ef041038470aae345cd71bb78&primary_release_date.gte=${formato}&sort_by=popularity.desc`
        );
        const data = response.data.results[0]; // Obtiene los datos de la primera película
        movie.value.title = data.title;
        movie.value.description = data.overview;
    } catch (error) {
        console.error(error);
    }
  });
  
  const reserveSeats = () => {
    router.push("/reserva");
  };
  </script>
  

  <style scoped>
  .cinema-room {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 20px;
  }

  h3, p {
    color: white;
  }
  </style>
  
