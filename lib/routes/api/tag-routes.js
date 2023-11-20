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
      through: 'ProductTag',
    }],
  })
  .then ((borealis) => {//tag output
    res.status(200).json(borealis);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});


//tag by 'id'
//findByPk method obtains only a single entry from the table, using the provided primary key.
router.get('/:id', async (req, res) => {
  await Tag.findByPk(req.params.id, {
    //associated product data
    include: [{
      model: Product,
      //product attributes
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      through: 'ProductTag',
    }],
  })
  .then((borealis) => {
    res.status(200).json(borealis);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});


//new tag
router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
