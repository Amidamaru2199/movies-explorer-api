const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const movieRouter = require('./routes/movies');
const userRouter = require('./routes/users');
const { createUser, loginUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/Logger');

const { PORT = 3001 } = process.env;

const app = express();

// mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/test', createUser);
app.post('/signin', loginUser);
app.use(auth);
app.use('/', userRouter);
app.use('/', movieRouter);

app.use(errorLogger);

(async function () {
  try {
    await mongoose.connect('mongodb://localhost:27017/bitfilmsdb');
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT} port`);
    });
  } catch (e) {
    console.log(`Error: ${e}`);
  }
}());
