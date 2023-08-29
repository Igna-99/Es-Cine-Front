import axios from "axios";

function getMoviePoster(posterPath) {
    return `https://image.tmdb.org/t/p/w200/${posterPath}`
}

function formatRuntime(minutos) {
    const horas = Math.floor(minutos / 60);
    const remainingMinutes = minutos % 60;
    return `${horas}h ${remainingMinutes}min`;
}

function formatDate(dateString) {
    var dateParts = dateString.split("-");
    var formattedDate = dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0].slice(-2);
    return formattedDate;
}



async function loadMoviesFromDB() {

    const moviesInDB = []
    const urlEsCineApi = 'http://localhost:8080/pelicula'

    try {

        const response = await axios.get(urlEsCineApi, { withCredentials: true });
        const moviesIds = response.data.result

        for (let index = 0; index < moviesIds.length; index++) {

            const movieId = moviesIds[index].idPelicula;
            const urlMovieDB = `https://api.themoviedb.org/3/movie/${movieId}?api_key=6311677ef041038470aae345cd71bb78&language=es`;
            const responsePelicula = await axios.get(urlMovieDB);

            moviesInDB.push(responsePelicula.data)
        }

    } catch (error) {
        console.log(error)
    }

    return moviesInDB
}

export { getMoviePoster, formatRuntime, formatDate, loadMoviesFromDB }

