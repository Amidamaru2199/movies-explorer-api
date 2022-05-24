const Movie = require('../models/movie');
const { moviesAdapter } = require('../utuls/muviesAdapter');
const NotFoundError = require('../errors/NotFoundError');
const DeletionError = require('../errors/DeletionError');
const BadRequestError = require('../errors/BadRequestError');

exports.createMove = (req, res, next) => {
  const userId = req.user && req.user._id;
  const movieData = { ...moviesAdapter(req.body), owner: userId };

  Movie.create(movieData)
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки фильма'));
      } else {
        next(err);
      }
    });
};

exports.deleteMovieById = (req, res, next) => {
  console.log('kjkj');
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
      if (err.name === 'CastError') {
        next(new BadRequestError('Не валидный id'));
      } else {
        next(err);
      }
    });
};

exports.getMovie = (req, res, next) => {
  const userId = req.user && req.user._id;

  Movie.find({ owner: userId })
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};
