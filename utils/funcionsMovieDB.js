function getMoviePoster (posterPath){
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

export { getMoviePoster, formatRuntime, formatDate }

