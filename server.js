const express = require('express');
const routes = require('./lib/routes');
//sequelize connection
const sequelize = require('./lib/config/connection');

const twinkle = express();
const PORT = process.env.PORT || 3013;

twinkle.use(express.json());
twinkle.use(express.urlencoded({ extended: true }));

twinkle.use(routes);

//sequelize models synced to database
sequelize.sync({ force: false }).then( () =>{
  //start server
  twinkle.listen(PORT, () => console.log(`
  
============================================================
*************** STARRY CELLAR STUFF's BACK END *************
============================================================
    ...        *                        *       *
    ...   *         * ..   ...                        *
*      ...        *           *            *
        ...               ...                          *
          ..                            *
  *        ..        *                       *
         __##____              *                      *
*    *  /  ##  ****                   *
       /        ****               *         *  X   *
 *    /        ******     *                    XXX      *
     /___________*****          *             XXXXX
      |            ***               *       XXXXXXX   X
  *   | ___        |                    *   XXXXXXXX  XXX
*     | | |   ___  | *       *             XXXXXXXXXXXXXXX
      | |_|   | |  ****             *           X   XXXXCCX
  *********** | | *******      *                X      X
************************************************************

  NOW OPEN
  http://localhost:${PORT}`));
});
  
  