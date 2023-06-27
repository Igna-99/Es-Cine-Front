<template>
    <div class="movie-container">
        <div class="card">
            <div class="content">
                <div class="back">
                    <div class="back-content">
                        <img :src="getMoviePoster(this.movie.poster_path)" alt="Poster" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="info-container">
        <p class="movie-title">{{ this.movie.title }}</p>
        <h3>Reserva de Asientos</h3>
        <div class="container">
            <h6 class="tituloID">Sala : {{ funcionSala }}</h6>
            <h6 class="tituloID">Horario : {{ funcionHorario }} hs</h6>
            <p>Selecciona tus asientos en la sala:</p>
            <div class="seat-container">
                <div v-for="(seat, seatIndex) in seats" :key="seatIndex" :class="seatClasses(seat)" @click="toggleSeat(seat)">
                    {{ seat.numeroAsiento }}
                </div>
            </div>
            <div class="button-container">
                <button v-on:click="submitReservation" class="reserve-button">Reservar</button>
            </div>
        </div>
    </div>
  <img class="backdrop" :src="getMovieBackdrop(this.movie.backdrop_path)" alt="Poster"/>
</template>

<script>

    import axios from "axios";

    export default {

        data() {
            return {
                idPelicula: this.$route.params.idPelicula,
                movie: "",
                funcionSala: this.$route.params.sala,
                funcionHorario: this.$route.params.horario,
                seats: [],
                reserva: {}
            };
        },

        methods: {

            async getMovie() {
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${this.idPelicula}?api_key=6311677ef041038470aae345cd71bb78&language=es`);
                    this.movie = response.data;
                } catch (error) {
                    console.error(error);
                }
            },

            getMoviePoster(posterPath) {
                return `https://image.tmdb.org/t/p/w500/${posterPath}`;
            },

            getMovieBackdrop(backdrop_path) {
                return `https://image.tmdb.org/t/p/w1280/${backdrop_path}`;
            },

            async getSeats() {
                try {
                    const response = await axios.get(
                    `http://localhost:8080/sala/${this.funcionSala}`
                    );
                    console.log("los asientos", response.data.result.Asientos);
                    this.seats = response.data.result.Asientos;
                    this.verificarAsientos();
                } catch (error) {
                    console.log(error);
                }
            },

            isSelected(seat) {
                return seat.selected;
            },

            isUnavailable(seat) {
                return seat.unavailable;
            },

            toggleSeat(seat) {
                if (!seat.unavailable) {
                    seat.selected = !seat.selected;
                }
            },

            seatClasses(seat) {
                return {
                    seat: true,
                    "seat-selected": this.isSelected(seat),
                    "seat-unavailable": this.isUnavailable(seat),
                };
            },

            async submitReservation() {
                const asientosSeleccionados = this.seats.filter((seat) => seat.selected).map((seat) => seat.numeroAsiento);
                try {
                    if ((asientosSeleccionados.length-1) === 0) {
                        const requestData = { 
                            asientosIds: asientosSeleccionados,
                        };
                        console.log(requestData);
                        await axios.put(`http://localhost:8080/sala/${this.funcionSala}`, {requestData,}); 
                    } else {
                        alert('no seleccionaste ninguno!');
                    }
                } catch (error) {
                    console.error("Error al guardar la reserva:", error);
                }
            },

            verificarAsientos() {
                this.seats.forEach((seat) => { 
                    if (seat.reservado) {
                        seat.unavailable = true;
                        seat.selected = false; 
                    }
                });
            }

        },

        created() {
            this.getMovie();
            this.getSeats();
        },

    };

</script>

<style scoped>

    h3, p {
        color: white;
    }
    .seat-container {
        display: flex;
        flex-direction: column;
    }
    .seat-row {
        display: flex;
        justify-content: center;
    }
    .seat {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        margin: 15px auto;
        border: 1px solid #ccc;
        cursor: pointer;
    }
    .seat-selected {
        background-color: lightgray;
        color: #202020;
    }
    .seat-unavailable {
        background-color: #f0f0f0;
        cursor: not-allowed;
        color: red;
    }
    .button-container {
        text-align: center;
        padding: 50px;
    }
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
