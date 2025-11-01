const path = require('node:path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express(); // initialize express in app

const allowedOrigins = ['http://localhost:5173'];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by cors'));
      }
    },
  })
);

// Middleware to allow us to correctly parse the incoming request’s body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router
const imageRouter = require('./routes/imageRouter');
app.use('/', imageRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app - listening on port ${PORT}`);
});
