const express = require('express');               
const app = express();
const blogRoutes = require('./routes/blogRoutes');
const loggerMiddleware = require('./middleware/loggerMiddleware');

app.set('view engine', 'ejs'); // Assuming EJS is used as the templating engine
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggerMiddleware);

app.use('/blog', blogRoutes);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
