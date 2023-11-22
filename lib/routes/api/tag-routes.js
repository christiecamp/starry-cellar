const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

//tag api endpoint

//all tags
router.get('/', async (req, res) => {
  await Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [{
      model: Product,
      //product attributes
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      through: ProductTag,
    }],
  })
  .then((borealis) => {//tag output
    res.status(200).json(borealis);
    console.log(`

                      ============================
                      ***** viewing all tags *****
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
  })
});


//tag by 'id'
//findByPk method obtains only a single entry from the table, using the provided primary key.
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    //associated product data
    include: [{
      model: Product,
      //product attributes
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      through: ProductTag,
    }]
  })
  .then((borealis) => { //output tag - by 'id'
    res.status(200).json(borealis);
    console.log(`

                      ============================
                      **** viewing tag by id *****
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
  .catch((err) => {
    res.status(400).json(err);
  });
});


//new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((borealis) => {
    res.status(200).json(borealis);
          console.log(`

                    ===============================
                    ****** tag was created! *******
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


//update tag by 'id'
router.put('/:id', (req, res) => {
  Tag.update(
    { 
      tag_name: req.body.tag_name,
    },
    { 
      where: {id: req.params.id}, 
    })
    .then((borealis) => {
      res.status(200).json(borealis);
      console.log(`
                    =================================
                    ******* tag was updated! ********
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


//delete tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((borealis) => {
    res.status(200).json(borealis);
    console.log(`
==========================================================================
************ tag was removed from STARRY CELLAR's database! **************
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
