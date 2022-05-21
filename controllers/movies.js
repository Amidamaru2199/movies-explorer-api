const Movie = require('../models/movie');

module.exports.createMove = (req, res) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  // const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.send({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailer: movie.trailer,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
    }))
    .catch((err) => { console.log(err); });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => { //
      if (!movie) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (String(movie.owner) === req.user._id) {
        return Movie.findByIdAndRemove(req.params.movieId)
          .then(() => { //
            res.send({ message: 'Пост удален' });
          });
      }
      throw new DeletionError('Нельзя удалять чужую карточку');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRquestError('Не валидный id'));
      } else {
        next(err);
      }
    });
};

module.exports.getMovie = (req, res) => {
  Movie.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      console.log(err);
    });
};
