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

<style scoped>
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
    grid-template-columns: repeat(4, 1fr);
    row-gap: 40px;
    column-gap: 60px
}

@media (max-width: 1250px) {
    .gri {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 960px) {
    .gri {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 680px) {
    .gri {
        grid-template-columns: repeat(1, 1fr);
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
import axios from 'axios';

export default {
    data() {
        return {
            peliculas: [],
        };
    },
    created() {
        document.title = "Cartelera"
        this.buscarPeliculas();
    },
    methods: {
        async buscarPeliculas() {

            const responseIdPeliculas = await axios.get(`http://localhost:8080/pelicula`);

            const idPelciulas = responseIdPeliculas.data.result;

            await idPelciulas.forEach(async (elemento) => {

                const idPelicula = elemento.idPelicula

                const url = `https://api.themoviedb.org/3/movie/${idPelicula}?api_key=6311677ef041038470aae345cd71bb78&language=es`;

                try {

                    let responsePelicula = await axios.get(url);

                    this.peliculas.push(responsePelicula.data)

                    this.peliculas.sort(function (a, b) {
                        return a.id - b.id;
                    });

                } catch (error) {
                    console.log(error)
                }
            });

        },

        getMoviePoster(posterPath) { return `https://image.tmdb.org/t/p/w500/${posterPath}` },
    }
};
/*
569094
713704
315162
447277

*/
</script>
