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
  .then((borealis) => {
    res.json(borealis);
    //add res.status
  })
});

//category by 'id'
//findByPk method obtains only a single entry from the table, using the provided primary key.
//findByPk(1) is equivalent to Model.findOne ({primaryKey: 1}) - specifying the primary key.
router.get('/:id', async (req, res) => {
  await Category.findByPk(req.params.id, {
    attributes: ['id', 'category_name'],
    includes: [{
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then((borealis) => {
    res.json(borealis);
    //res.status
  })
  .catch ((err) => {
   //res.status
  });
});

//new category
//create method combines build and save methods
router.post('/', async (req, res) => {
await Category.create(req.body)
              .then((newBorealis) => res.status(200).json(newBorealis))
              .catch((err) => {
                console.log(err);
                res.status(400).json(err);
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
  .then(cat => Category.findByPk(req.params.id))

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
