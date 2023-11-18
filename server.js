const express = require('express');
const routes = require('./lib/routes');
// import sequelize connection

const twinkle = express();
const PORT = process.env.PORT || 3001;

twinkle.use(express.json());
twinkle.use(express.urlencoded({ extended: true }));

twinkle.use(routes);

// sync sequelize models to the database, then turn on the server
twinkle.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
