<template>
    <div class="borde_doble ">

        <div class="container_basic grid">

            <div class="img_container">
                <img :src="getMoviePoster(movie.poster_path)" alt="Poster">
            </div>

            <div class="info_movie">

                <h3> {{ movie.title }} </h3>

                <h6> {{ formatRuntime(movie.runtime) }} </h6>

                <h6> #{{ movie.id }} </h6>

                <h6> {{ formatDate(movie.release_date) }} </h6>

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
            usrStore: usrStore()
        }
    },
    props: ['movie'],
    methods: {
        getMoviePoster,
        formatRuntime,
        formatDate,
    }
}

</script>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
}

.img_container {
    display: flex;
    justify-content: center;
}

.img_container img{
    width: 100%;
    max-width: 200px;
}  

.info_movie{
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.container_basic {
    padding: 10px   ;
}
</style>