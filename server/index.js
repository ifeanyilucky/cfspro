require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectMongoose = require('./db/mongodb');
const authRouter = require('./routes/auth');
const investmentRouter = require('./routes/investment');
const staticRouter = require('./routes/static');

// middlewares
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/error-handler');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(
  cors({
    credentials: true,
    origin: '*',
  })
);
app.get('/welcome', function (req, res) {
  res.render('welcome');
});
app.use('/api', authRouter);
app.use('/api', investmentRouter);
app.use('/api/static', staticRouter);
app.get('/api/static', (req, res) => {
  res.send('<h1>Crestfinance Pro API</h1>');
});

app.use(errorHandler);
app.use(notFound);
const PORT = process.env.PORT || 3300;

const startServer = async () => {
  try {
    await connectMongoose(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
