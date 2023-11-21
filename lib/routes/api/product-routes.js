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
    }],
  })
  .then((products) => {//output product
    res.status(200).json(products);
  })
  .catch((err) => {
    res.status(400).json(err);
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
  })
  .catch((err) => {
    res.status(400).json(err);
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
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
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
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
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
      return  ProductTag.findAll({where: {product_id: req.params.id}});
    })
    .then((productTags) => {
      //current tag_ids
      const productTagIds = productTags.map(({tag_id}) => tag_id);
      //create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      //figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({tag_id}) => !req.body.tagIds.includes(tag_id))
        .map(({id}) => id);
          // run both actions
      return Promise.all([
        ProductTag.destroy({where:{id: productTagsToRemove}}),
        ProductTag.bulkCreate(newProductTags),
        ]);
    })
    .then((updatedProductTags) => res.status(200).json(updatedProductTags))
    .catch((err) => {
        res.status(400).json(err);
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
    res.status(200).json(`${deletedProduct} was removed from the database`);
  })
  .catch((err) => {
    res.status(400).json(err);
  });
});

module.exports = router;
