exports.moviesAdapter = (reqBody) => ({
  country: reqBody.country,
  director: reqBody.director,
  duration: reqBody.duration,
  year: reqBody.year,
  description: reqBody.description,
  image: reqBody.image,
  trailerLink: reqBody.trailerLink,
  nameRU: reqBody.nameRU,
  nameEN: reqBody.nameEN,
  thumbnail: reqBody.thumbnail,
  movieId: reqBody.movieId,
});
