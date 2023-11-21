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
  .then((tags) => {//tag output
    res.status(200).json(tags);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
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
      through: 'ProductTag',
    }],
  })
  .then((tag) => { //output tag - by 'id'
    res.status(200).json(tag);
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
  .then((newTag) => {
    res.status(200).json(newTag);
  })
  .catch((err) => {
    res.status(400).json(err);
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
    .then((updatedTag) => {
      res.status(200).json(updatedTag);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});


//delete tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((deletedTag) => {
    res.status(200).json( `${deletedTag} was removed from the database`);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

module.exports = router;
