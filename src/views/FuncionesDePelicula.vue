<template>
  <div>

    <div class="container">
      <h1>Funciones de {{ this.pelicula.title }}</h1>
    </div>

    <div class="container" v-for="funcion in this.funciones">
      <h6 class="tituloID">Funcion {{ funcion }}</h6>
    </div>

  </div>
</template>



<script>
import axios from 'axios';
export default {
  data() {
    return {
      idPelicula: this.$route.params.idPelicula,
      pelicula: [],
      funciones: [],
    }
  },
  methods: {

    async traerFuncionesDePelicula() {
      try {

        const url = `http://localhost:8080/funcion/pelicula/${this.idPelicula}`;

        const response = await axios.get(url);

        this.funciones = response.data.result;

        console.log(this.funciones)


      } catch (error) {

        console.error(error)

      }

    },

    async traerPelicula() {
      try {

        const url = `https://api.themoviedb.org/3/movie/${this.idPelicula}?api_key=6311677ef041038470aae345cd71bb78&language=es`;

        const response = await axios.get(url);

        this.pelicula = response.data;

      } catch (error) {

        console.error(error)

      }
    }


  },
  created() {

    this.traerPelicula();

    this.traerFuncionesDePelicula();

  },

}

</script>


<style scoped>
.container {
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;
  padding: 20px 80px;
  position: relative;
  color: #fff;
  background-color: #202020;
  overflow: hidden;
  max-width: 100%;
  z-index: 1;
  font-family: "Montserrat", sans-serif;
  max-width: 800px;
}

.tituloID {
  text-align: right;
  display: flex;
  margin: 0;
}
</style>