<template>
	<div v-if="this.usrStore.isLogged">

		<div v-if="this.funcion && this.pelicula">

			<div class="movie-container">
				<div class="card">
					<div class="content">
						<div class="back">
							<div class="back-content">
								<img :src="getMoviePoster(pelicula.poster_path)" alt="Poster">
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="info-container">

				<p class="movie-title">{{ pelicula.title }}</p>
				<h3>Reserva de Asientos</h3>
				<div class="container">
					<h6 class="tituloID">Sala : {{ this.funcion.sala }}</h6>
					<h6 class="tituloID">Horario : {{ this.funcion.horario }} hs</h6>
					<p>Selecciona tus asientos en la sala:</p>
					<div class="seat-container">
						<div v-for="(seat, seatIndex) in this.funcion.Asientos" :key="seatIndex" :class="seatClasses(seat)"
							@click="toggleSeat(seat)">
							{{ seat.AsientosDeFuncion.numeroAsiento }}
						</div>
					</div>
					<div class="button-container">
						<button v-on:click="generarReserva" class="reserve-button">Reservar</button>
					</div>
				</div>

			</div>

			<img class="backdrop" :src="getMovieBackdrop(pelicula.backdrop_path)" alt="Poster">

		</div>

		<div v-else>
			<div class="container">
				<h1>La Funcion No Existe</h1>
			</div>
		</div>

	</div>

	<div v-else>
		<div class="container">
			<h1>no estas logeado</h1>
		</div>
	</div>
</template>

<script>
import { usrStore } from '../../components/store/usrStore'
import axios from 'axios';

export default {
	data() {
		return {
			usrStore: usrStore(),
			idFuncion: this.$route.params.idFuncion,
			funcion: null,
			pelicula: null,
			asientosDeFuncion: null,
		};
	},
	async created() {


		await this.traerFuncion();

	},
	methods: {

		async traerFuncion() {
			try {
				const url = `http://localhost:8080/funcion/${this.idFuncion}`;
				const response = await axios.get(url);

				this.funcion = response.data.result;

				this.funcion.Asientos.forEach((seat) => {

					seat.selected = false;
					if (!seat.AsientosDeFuncion.idReserva) {
						seat.unavailable = false;
					} else {
						seat.unavailable = true;
					}
				});

				this.buscarPelicula();


			} catch (error) {
				console.error(error.response.data.message);
			};
		},

		async buscarPelicula() {
			try {
				const url = `https://api.themoviedb.org/3/movie/${this.funcion.idPelicula}?api_key=6311677ef041038470aae345cd71bb78&language=es`;
				const response = await axios.get(url);
				this.pelicula = response.data;
			} catch (error) {
				console.error(error);
			};

		},

		async generarReserva() {

			const asientoSeleccionado = this.funcion.Asientos.find((elemento) => {
				return elemento.selected == true;
			});


			if (!asientoSeleccionado) {
				alert('debe seleccionar un Asiento')
			} else {

				const url = 'http://localhost:8080/Reserva/create'

				const data = {
					IdFuncion: this.idFuncion,
					numeroAsiento: asientoSeleccionado.AsientosDeFuncion.numeroAsiento,
				};

				try {

					const response = await axios.post(url, data, { withCredentials: true });

					if(response.data.success){
						alert('Reserva Realizada con Existo')
						this.$router.push("/reservasUsuario");
					}


				} catch (error) {
					console.error("Error al guardar la reserva:", error.response.data.message);
				}
			}
		},



		toggleSeat(asientoSeleccionado) {
			this.funcion.Asientos.forEach((asiento) => {
				if (!asiento.AsientosDeFuncion.idReserva) {
					asiento.selected = false;
				}
			});

			if (!asientoSeleccionado.unavailable) {
				asientoSeleccionado.selected = !asientoSeleccionado.selected;
			}
		},

		seatClasses(seat) {
			return {
				seat: true,
				"seat-selected": seat.selected,
				"seat-unavailable": seat.unavailable,
			};
		},


		getMoviePoster(posterPath) {
			return `https://image.tmdb.org/t/p/w500/${posterPath}`
		},

		getMovieBackdrop(backdrop_path) {
			return `https://image.tmdb.org/t/p/w1280/${backdrop_path}`
		},


	}
};
</script>

<style scoped>
h3,
p {
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
	border: 1px solid red;
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

.reserve-button {
	margin-top: 20px;
	font-size: 15px;
	padding: 0.7em 2.7em;
	letter-spacing: 0.06em;
	position: relative;
	font-family: inherit;
	border-radius: 4px;
	text-decoration: none;
	overflow: hidden;
	transition: all 0.3s;
	line-height: 1.4em;
	border: 2px solid white;
	background: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1%, transparent 40%, transparent 60%, rgba(145, 145, 145, 0.1) 100%);
	color: white;
	box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.4), 0 0 9px 3px rgba(255, 255, 255, 0.1);
}

.reserve-button:hover {
	color: #ffffff;
	box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.6), 0 0 9px 3px rgba(255, 255, 255, 0.2);
}


.reserve-button:before {
	content: "";
	position: absolute;
	left: -4em;
	width: 4em;
	height: 100%;
	top: 0;
	transition: transform .4s ease-in-out;
	background: linear-gradient(to right, transparent 1%, rgba(255, 255, 255, 0.1) 40%, rgba(255, 255, 255, 0.1) 60%, transparent 100%);
}

.reserve-button:hover:before {
	transform: translateX(15em);
}


.info-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	background-color: #1d1d1de1;
	max-width: 80%;
	min-width: 350px;
	padding: 3%;
	padding-top: 10%;
	margin-top: -10%;
	position: relative;
	border-radius: 10px;
	box-shadow: 0px 0px 20px 4px #000000;
}

.backdrop {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0.5;
	background-size: cover;
	background-position: center;
	z-index: -2;
}

.movie-title {
	margin-top: 20px;
	color: white;
	font-weight: 600;
	font-family: "Montserrat", sans-serif;
}

.movie-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 2;
	position: relative;
}

.movie-container .card {
	overflow: visible;
	width: 172px;
	height: 257px;
	border: none;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.content {
	width: 100%;
	height: 100%;
	transform-style: preserve-3d;
	transition: transform 300ms;
	box-shadow: 0px 0px 10px 1px #000000ee;
	border-radius: 5px;

}

.front,
.back {
	background-color: black;
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	-webkit-backface-visibility: hidden;
	border-radius: 5px;
	overflow: hidden;
}

.back {
	width: 100%;
	height: 100%;
	justify-content: center;
	display: flex;
	align-items: center;
	overflow: hidden;

}

.back::before {
	position: absolute;
	content: ' ';
	display: block;
	width: 160px;
	height: 160%;
	background: linear-gradient(90deg, transparent, #6d6d6d, #adadad, #d4d4d4, #ffffff, transparent);
	animation: rotation_481 5000ms infinite linear;
}

.back-content {
	position: absolute;
	width: 99%;
	height: 99%;
	border-radius: 5px;
	color: white;
	display: flex;
	flex-direction: column;
	gap: 30px;
	align-items: center;

}

.back-content img {
	max-width: 100%;
	max-height: 100%;
	border-radius: 5px;

}


@keyframes rotation_481 {
	0% {
		transform: rotateZ(0deg);
	}

	0% {
		transform: rotateZ(360deg);
	}
}
</style>

