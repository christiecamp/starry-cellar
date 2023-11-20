const express = require('express');
const routes = require('./lib/routes');
//sequelize connection
const sequelize = require('./lib/config/connection');

const twinkle = express();
const PORT = process.env.PORT || 3001;

twinkle.use(express.json());
twinkle.use(express.urlencoded({ extended: true }));

twinkle.use(routes);

//sequelize models synced to database
sequelize.sync({ force: false }).then( () =>{
  //start server
  twinkle.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
  
  