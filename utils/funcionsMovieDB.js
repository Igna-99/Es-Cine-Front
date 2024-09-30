import axios from "axios";

function getMoviePoster(posterPath) {
  return `https://image.tmdb.org/t/p/w200/${posterPath}`;
}

function formatRuntime(minutos) {
  const horas = Math.floor(minutos / 60);
  const remainingMinutes = minutos % 60;
  return `${horas}h ${remainingMinutes}min`;
}

function formatDate(dateString) {
  var dateParts = dateString.split("-");
  var formattedDate =
    dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0].slice(-2);
  return formattedDate;
}

async function getMoviesToReleaseFromTMDB() {
  const apiKey = "6311677ef041038470aae345cd71bb78&language=es";
  const urlEsCineApi = "http://localhost:8080/peliculaPorEstrenar/all";
  let moviesIds;

  try {
    const response = await axios.get(urlEsCineApi, { withCredentials: true });
    moviesIds = response.data.result;
  } catch (error) {
    throw new Error(`Error fetching movies from EsCineAPI: ${error.message}`);
  }

  try {
    const moviesPromises = moviesIds.map((movie) =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie.idPelicula}?api_key=${apiKey}`
        )
        .then((response) => response.data)
    );

    return await Promise.all(moviesPromises);
  } catch (error) {
    throw new Error(`Error fetching movies from TMDB: ${error.message}`);
  }
}

async function getMoviesInTheaterFromTMDB() {
  const apiKey = "6311677ef041038470aae345cd71bb78&language=es";
  const urlEsCineApi = "http://localhost:8080/pelicula/all";
  let moviesIds;

  try {
    const response = await axios.get(urlEsCineApi, { withCredentials: true });
    moviesIds = response.data.result;
  } catch (error) {
    throw new Error(`Error fetching movies from EsCineAPI: ${error.message}`);
  }

  try {
    const moviesPromises = moviesIds.map((movie) =>
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${movie.idPelicula}?api_key=${apiKey}`
        )
        .then((response) => response.data)
    );

    return await Promise.all(moviesPromises);
  } catch (error) {
    throw new Error(`Error fetching movies from TMDB: ${error.message}`);
  }
}

async function getMovieFromTMDB(movieId) {
  const apiKey = "6311677ef041038470aae345cd71bb78&language=es";

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
    );
    
    return response.data;
  } catch (error) {
    const e = new Error(`Error fetching movie with ID ${movieId} from TMDB: ${error.message}`);
    if (
      error.response &&
      error.response.data &&
      error.response.data.status_code
    ) {
      e.status_code = error.response.data.status_code == 34
    }
    throw e
  }
}

export {
  getMoviePoster,
  formatRuntime,
  formatDate,
  getMoviesToReleaseFromTMDB,
  getMoviesInTheaterFromTMDB,
  getMovieFromTMDB,
};
