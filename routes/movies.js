const movieRouter = require('express').Router();
const { createMove, deleteMovieById, getMovie } = require('../controllers/movies');

movieRouter.post('/movies', createMove);
movieRouter.get('/movies', getMovie);
movieRouter.delete('/movies/_id', deleteMovieById);

module.exports = movieRouter;
