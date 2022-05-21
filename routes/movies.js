const movieRouter = require('express').Router();
const { createMove, deleteMovie, getMovie } = require('../controllers/movies');

movieRouter.post('/movies', createMove);
movieRouter.get('/movies', deleteMovie);
movieRouter.delete('/movies/_id', getMovie);

module.exports = movieRouter;
