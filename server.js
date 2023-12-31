require('dotenv').config();

const express = require('express');
const routes = require('./routes');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW)
  console.log(`App listening on port ${PORT}!`);
});
