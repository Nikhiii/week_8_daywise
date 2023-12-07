const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const formRoutes = require('./routes/formRoutes');

const app = express();
const port = 8080;
const mongoURI = 'mongodb://0.0.0.0:27017/formdataDB';

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.set('view engine', 'ejs');

// Database Connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Routes
app.get('/', (req, res) => {
  res.render('form');
});

app.use('/formData', formRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
