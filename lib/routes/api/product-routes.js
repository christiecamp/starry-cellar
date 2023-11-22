const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

//product api endpoint

//all products
router.get('/', async (req, res) => {
  await Product.findAll({
    attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
    //associated tag and category data
    include: [{
      model: Tag,
      //tag attributes
      attibutes: ['id', 'tag_name'],
      through: 'ProductTag',
    },
    {
      model: Category,
      //category attributes
      attributes: ['id', 'category_name'],
    }]
  })
  .then((product) => {//output product
    res.status(200).json(product);
    console.log(`

                      ============================
                      *** viewing all products ***
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

//product by 'id'
//findByPk method obtains only a single entry from the table, using the provided primary key.
router.get('/:id', (req, res) => {
  Product.findByPk(req.params.id, {
    include: [{
      model: Tag,
      attributes: ['id', 'tag_name'],
      through: 'ProductTag',
    },
    {
    model: Category,
    attributes: ['id', 'category_name'],
    }],
  })
  .then((product) => { //output product - by 'id'
    res.status(200).json(product);
    console.log(`

                      ============================
                      ** viewing product by id **
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
    console.log(err);
  });
});


//new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tag_id.length) {
        const productTagIdArr = req.body.tag_id.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      } else {
      // if no product tags, just respond
      res.status(200).json(product);
      }
    })
    .then((productTagIds) => {
      res.status(200).json(productTagIds);
      console.log(`
      
                      ===============================
                      **** product was created! *****
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


//update product - by 'id'
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      //find all associated tags
      return ProductTag.findAll({where: {product_id: req.params.id}});
    })
    .then((productTags) => {
      //current tag_ids
      const productTagIds = productTags.map(({tag_id}) => tag_id);
      //create filtered list of new tag_ids
      const newProductTags = req.body.tag_id
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      //figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({tag_id}) => !req.body.tag_id.includes(tag_id))
        .map(({id}) => id);
          // run both actions
      return Promise.all([
        ProductTag.destroy({where:{id: productTagsToRemove}}),
        ProductTag.bulkCreate(newProductTags),
        ]);
    })
    .then((updatedProductTags) => {
      res.status(200).json(updatedProductTags);
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


//delete product
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deletedProduct) => {
    res.status(200).json(deletedProduct);
    console.log(`
    ==========================================================================
    *********** product was removed from STARRY CELLAR's database! ***********
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
  });
});

module.exports = router;
