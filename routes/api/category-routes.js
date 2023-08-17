const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Product.findAll({
      include: [
        Product, 
        {
          module: Category,
       
        }
      ],
    });
  
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  });

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Product.findOne({
      where: {id: req.params.id },
      include: [
        Product, 
        {
          module: Category,
        
        }
      ],
    });
  if (!categoryData) {
    res.status(400).json({message: 'No Product Found With That ID'})
  }
    res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  });



router.post('/', async (req, res) => {
  // create a new category
  try{
    const categoryData = await Category.create({
      category_name: req.body.category_name  
    });
    res.status(200).json(categoryData);
  } catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryDate = await Category.update(req.body,{
      where:{
        id: req.params.id
      },

    });
    if (!categoryDate){
      res.status(404).json({message: 'No ID'});
      return;
    }
    res.status(200).json(categoryDate);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    
  }


});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.findOneAndDelete({
      where: {id: req.params.id },
      
    });
  if (!categoryData) {
    res.status(400).json({message: 'No Product Found With That ID'})
  }
    res.status(200).json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }



});

module.exports = router;
