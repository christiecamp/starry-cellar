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
  .then((categories) => { //ouput category
    res.status(200).json(categories);
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
  .then((category) => { //output category by 'id'
    res.status(200).json(category);
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
              .then((newCategory) => res.status(200).json(newCategory))
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
  .then(category => Category.findByPk(req.params.id))
  .then((updatedCategory) => res.status(200).json(updatedCategory))
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
  .then((deletedCategory) => {
    res.status(200).json(`${deletedCategory} removed from database`);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

module.exports = router;
