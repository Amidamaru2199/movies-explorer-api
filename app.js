const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movieRouter = require('./routes/movies');
const userRouter = require('./routes/users');
const { createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', createUser);

app.use('/', userRouter);
app.use('/', movieRouter);

app.listen(PORT);
