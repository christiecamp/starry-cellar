const router = require('express').Router();
const { Category, Product } = require('../../models');

//category api endpoint

//all categories
//The findAll method is the most basic finder method - returns all the records in the database that match the query.
router.get('/', async (req, res) => {
  await Category.findAll({
    attributes: ['id', 'category_name'],
    include: [{
      model: Product,
      //product attributes
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then((borealis) => { //ouput category
    res.status(200).json(borealis);
    console.log(`

                      ============================
                      ** viewing all categories **
                      ============================
                         .          *      *
                           *   _[_]_   .   x   .
                     *          (")       xxx
                        .    --( : )--   xxCCx    *
                              (  :  )      x  .
                             ""-...-""     x
    `);
  })
  .catch((err) => {
    res.status(400).json(err);
    console.log(err);
  });
});


//category by 'id'
//findByPk method obtains only a single entry from the table, using the provided primary key.
//findByPk(1) is equivalent to Model.findOne ({primaryKey: 1}) - specifying the primary key.
router.get('/:id', async (req, res) => {
  await Category.findByPk(req.params.id, {
    attributes: ['id', 'category_name'],
    includes: [{
      model: Product,
      //product attributes
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then((borealis) => { //output category by 'id'
    res.status(200).json(borealis);
    console.log(`

                      ============================
                      ** viewing category by id **
                      ============================

                                  *
     .-.    *   .         *                              ' '      *
    ( (                          .   |           *      - * -
     '-'         .                  -+-     *            ' '
       .                  o         _|_      .       *             
              ))         }^{       /___\          ))       .
   .       .-#-----.     /|\     .---'-'---.    .-#-----.       *
       ___ /_________\   //|\\   /___________\  /_________\         .
      /___\ |[] _ []|    //|\\    | A /^\ A |    |[] _ []|   _.O,_
  ...|"#"|.|  |*|  |.../CC|\\\... |   |"|  |....|  |*|  |....(^)....

    `);
  })
  .catch ((err) => {
   res.status(400).json(err);
   console.log(err);
  });
});


//new category
//create method combines build and save methods
router.post('/', async (req, res) => {
await Category.create(req.body)
              //new category
              .then((borealis) => {//output new category
                res.status(200).json(borealis);
                console.log(`

                    ===============================
                    **** category was created! ****
                    ===============================

                .      *    *       *.       *   .   *     .
               .   .                  *    .     .     *
    *       *         *   .     .     __     *       .       *
  .  *  /\       /\          *      _|__|_     .   *     .    
       /  \   * /  \  *          .   ('')   *       .         .
  *    /  \     /  \   .   *       <(  . )>  .          *
      /    \   /    \         .    (   .  )     *
        ||       ||              .. CC---"" ..    * 
                `);
              })
              .catch((err) => {
                res.status(400).json(err);
                console.log(err);
              });
});

//update category - by 'id'
//update - instance method that can be used as an alternative way to update a single record in the database.
router.put('/:id', async (req, res) => {
  await Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then(category => Category.findByPk(req.params.id))
  .then((borealis) => {
    res.status(200).json(borealis);
    console.log(`
                    =================================
                    ***** category was updated! *****
                    =================================
                                 ____
                              .-" +' "-.
                             /.'.'A_'*'.;
                            |:.*'/\=\. ' :|
                            |:.'.||"|.'*:|
                             ;:~^~^~^~^:/
                              /'-....-'\'
                             /          \.
                            ' -.,____,.- ' 
    `);
  })
  .catch((err) => {
    res.status(400).json(err);
    console.log(err);
  });
});


//delete category
router.delete('/:id', async (req, res) => {
  await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((borealis) => {
    res.status(200).json(borealis);
    console.log(`
==========================================================================
********** category was removed from STARRY CELLAR's database! ***********
==========================================================================
' : | | | |:  ||  :     '  :  |  |+|: | : : :|   .        '              .
'' : | :|  ||  |:  :    '  |  | :| : | : |:   |  .                    :
   .' ':  ||  |:  |  '       ' || | : | |: : |   .  '           .   :.
          ''  ||  |  ' |   *    ' : | | :| |*|  :   :               :|
  *    *       ''  |  : :  |  .      ' ' :| | :| . : :         *   :.||
       .'            | |  |  : .:|       ' | || | : |: |          | ||
'          .         + '  |  :  .: .         '| | : :| :    .   |:| ||
   .                 .    ' *|  || :       '    | | :| | :      |:| |
.                .          .        || |.: *          | || : :     :|||
  .            .   . *    .   .  '' |||.  +        + '| |||  .  ||'
.             *              .     +:'|!             . ||||  :.||'
+                      .                ..!|*          . | :'||+ |||'
.                         +      : |||''        .| :| | | |.| ||'     .
 *     +   '               +  :|| |'     :.+. || || | |: '||  
                      .      .||  .    ..|| | |: ' '| | |'   +
.       +++                      ||        !|!: '       :| |
        +         .      .    | .      '|||.:      .||    .      .    '
    '                           '|.   .  ' :|||   + ||'     '
__    +      *                         '       '|.    ':
"'  '---"""----....____,..^---'^''----.,.___          '.    '.  .    ____,.,-
___,--'""'---"'   ^  ^ ^        ^       """---,..___ __,..---""'
--"'                           ^                         ''--..,__ STARRY
                                                                      CELLAR
    `);
  })
  .catch((err) => {
    res.status(400).json(err);
    console.log(err);
  });
});

module.exports = router;