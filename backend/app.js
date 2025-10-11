const path = require('node:path');
const express = require('express');
require('dotenv').config();

const app = express(); // initialize express in app

// Middleware to allow us to correctly parse the incoming request’s body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router
const imageRouter = require('./routes/imageRouter');
app.use('/images', imageRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app - listening on port ${PORT}`);
});
