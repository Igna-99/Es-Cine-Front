<template>
    <div class="movie-container">
        <div class="card">
            <div class="content">
                <div class="back">
                    <div class="back-content">
                        <img :src="getMoviePoster(this.pelicula.poster_path)" alt="Poster"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="info-container">
        <p class="movie-title">{{ this.pelicula.title }}</p>
        <p>FUNCIONES</p>
        <div class="container" v-for="funcion in this.funciones">
            <h6 class="tituloID">SALA : {{ funcion.sala }}</h6>
            <h6 class="tituloID">HORARIO : {{ funcion.horario }} hs</h6>
            <router-link :to="`/reserva/${funcion.sala}/${funcion.horario}/${idPelicula}`" class="reserve-button">RESERVAR ASIENTOS</router-link>
        </div>
    </div>
    <img class="backdrop" :src="getMovieBackdrop(this.pelicula.backdrop_path)" alt="Poster"/>
</template>

<script>

    import axios from "axios";

    export default {

        data() {
            return {
                idPelicula: this.$route.params.idPelicula,
                pelicula: [],
                funciones: [],
            };
        },

        methods: {

            async traerFuncionesDePelicula() {
                try {
                    const url = `http://localhost:8080/funcion/pelicula/${this.idPelicula}`;
                    const response = await axios.get(url);
                    this.funciones = response.data.result;
                    console.log(this.funciones);
                } catch (error) {
                    console.error(error);
                };
            },

            async traerPelicula() {
                try {
                    const url = `https://api.themoviedb.org/3/movie/${this.idPelicula}?api_key=6311677ef041038470aae345cd71bb78&language=es`;
                    const response = await axios.get(url);
                    this.pelicula = response.data;
                } catch (error) {
                    console.error(error);
                };
            },

            getMoviePoster(posterPath) {
                return `https://image.tmdb.org/t/p/w500/${posterPath}`;
            },

            getMovieBackdrop(backdrop_path) {
                return `https://image.tmdb.org/t/p/w1280/${backdrop_path}`;
            },
            
        },

        created() {
            this.traerPelicula();
            this.traerFuncionesDePelicula();
        },

    };

</script>

<style scoped>
    .container {
        gap: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;
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
        text-align: center;
        display: flex;
        margin: 0;
    }

    p {
        color: #fff;
    }

    .info-container {
        max-width: 80%;
        min-width: 500px;
    }

    .reserve-button {
        text-align: center;
    }
    
</style>