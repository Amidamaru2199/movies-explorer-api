const Movie = require('../models/movie');
const { moviesAdapter } = require('../utuls/muviesAdapter');
const NotFoundError = require('../errors/NotFoundError');
const DeletionError = require('../errors/DeletionError');

exports.createMove = (req, res) => {
  const userId = req.user && req.user._id;
  const movieData = { ...moviesAdapter(req.body), owner: userId };

  Movie.create(movieData)
    .then((movie) => res.send(movie))
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteMovieById = (req, res) => {
  //const { id: movieId } = req.params;
  const userId = req.user && req.user._id;

  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (String(movie.owner) === userId) {
        return Movie.findByIdAndRemove(req.params._id).then(() => {
          res.send({ message: 'Фильм удален' });
        });
      }
      throw new DeletionError('Нельзя удалять чужой фильм');
    })
    .catch((err) => {
      res.status(err.statusCode).send(err);
    });
};

exports.getMovie = (req, res) => {
  const userId = req.user && req.user._id;

  Movie.find({ owner: userId })
    .then((cards) => res.send(cards))
    .catch((err) => {
      console.log(err);
    });
};
