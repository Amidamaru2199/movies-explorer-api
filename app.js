require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/Logger');
const errorHandler = require('./errors/errorHandler');

const LOCAL_DB_URL = 'mongodb://localhost:27017/bitfilmsdb';
const { PORT = 3001, DB_URL = LOCAL_DB_URL } = process.env;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(require('./routes/index'));

app.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

(async function () {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT} port`);
    });
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}());
