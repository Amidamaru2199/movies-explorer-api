const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createMove, deleteMovieById, getMovie } = require('../controllers/movies');

movieRouter.post(
  '/movies',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.[a-z0-9_-]{2,3}))(:\d{2,5})?((\/.+)+)?\/?#?/m),
      trailerLink: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.[a-z0-9_-]{2,3}))(:\d{2,5})?((\/.+)+)?\/?#?/m),
      thumbnail: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.[a-z0-9_-]{2,3}))(:\d{2,5})?((\/.+)+)?\/?#?/m),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMove,
);
movieRouter.get('/movies', getMovie);
movieRouter.delete('/movies/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovieById);

module.exports = movieRouter;
