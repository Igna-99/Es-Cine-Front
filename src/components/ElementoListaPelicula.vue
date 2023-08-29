<template>
    <div class="borde_doble">

        <div class="container_basic grid">

            <div class="img_container">
                <img :src="getMoviePoster(movie.poster_path)" alt="Poster">
            </div>

            <div class="info_movie">

                <span class="titulo"> {{ movie.title }} </span>
                <span class="info"> {{ formatRuntime(movie.runtime) }} </span>
                <span class="info"> #{{ movie.id }} </span>
                <span class="info"> {{ formatDate(movie.release_date) }} </span>

                <div class="sub_container_icon">

                    <div class="container_icon icon_red resaltable" data-bs-toggle="modal"
                        :data-bs-target="'#modalHabilitar' + movie.id">
                        <i class="bi bi-trash3-fill">Eliminar</i>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" :id="'modalHabilitar' + movie.id" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true" data-bs-theme="dark">
        <div class="modal-dialog">
            <div class="modal-content text-light">

                <div class="modal-header ">
                    Eliminar Funcion

                    <button :id="'btn_cerrar_modal' + movie.id" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    
                    <p> Deseas Eliminar '{{ movie.title }}' de la tu cartelera de peliculas </p>

                    <p v-if="this.moviefunctions == 0">  La pelicula No Tiene Funciones Programadas </p>
                    <p v-else> La pelicula Tiene {{ this.moviefunctions }} Funciones Programadas, las culaes seran eliminadas </p>

                   
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" @click="deleteMovie()">
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { usrStore } from '../components/store/usrStore'

import { getMoviePoster, formatRuntime, formatDate } from '../../utils/funcionsMovieDB'

export default {
    data() {
        return {
            usrStore: usrStore(),
            moviefunctions: null,
        }
    },
    emits: ['reloadMovies'],
    props: ['movie'],
    async mounted() {
        this.loadMovieFunctions()
    },

    methods: {
        getMoviePoster,
        formatRuntime,
        formatDate,

        async loadMovieFunctions() {

            const url = `http://localhost:8080/funcion/cantidad/pelicula/${this.movie.id}`;

            try {
                const response = await axios.get(url, { withCredentials: true });
                this.moviefunctions = response.data.result

            } catch (error) {
                console.log(error)
            }
        },

        async deleteMovie() {

            const url = 'http://localhost:8080/pelicula/delete';
            const data = {
                idPelicula: this.movie.id,
            };

            try {
                const response = await axios.post(url, data, { withCredentials: true });

                document.getElementById('btn_cerrar_modal' + this.movie.id).click();
                this.$emit("reloadMovies");
            } catch (error) {
                console.log(error)
            }
        }
    }
}

</script>

<style scoped>
.sub_container_icon {
    margin-top: 15px;
}

.grid {
    display: grid;
    height: 100%;
    align-items: center;
    grid-template-columns: 1fr 2fr;
}

.img_container {
    display: flex;
    justify-content: center;
}

.img_container img {
    aspect-ratio: 200 / 300;
    width: 100%;
    max-width: 200px;
}

.info_movie {
    height: 100%;
    padding: 15px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.container_basic {
    padding: 10px;
}

.titulo {
    font-size: 20px;
    font-weight: bold;
}

.info {
    font-size: 12px;
}

@media screen and (min-width:500px) and (max-width:1000px) {

    .info_movie {
        height: 80%;
        padding: 0px;
    }

    .titulo {
        font-size: 25px;
    }

    .info {
        font-size: 17px;
    }
}</style>