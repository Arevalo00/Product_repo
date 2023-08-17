const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
try { 
  const tagData = await Tag.findAll({
    include:  {model: Product, through: ProductTag},
  });
  res.status(200).json(tagData); 
  
} catch (err) {
  console.log(err);
 res.status(500).json(err); 
}
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try { 
    const tagData = await Tag.findOne({
      include:  {model: Product, through: productTag},
    });
    res.status(200).json(tagData); 
    
  } catch (err) {
    console.log(err);
   res.status(500).json(err); 
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
  const tagData = await Tag.create({
    product_id: req.body.product_id,
    tag_name:req.body.tag_name,
  });
  res.status(200).json(tagData);
} catch(err){
  console.log(err);
  res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagDate = await Tag.update(req.body,{
      where:{
        id: req.params.id
      },

    });
    if (!tagDate){
      res.status(404).json({message: 'No ID'});
      return;
    }
    res.status(200).json(tag);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.findOneAndDelete({
      where:{
        id: req.params.id,
      }
      
    });
  if (!tagData){
    res.status(400).json({message: 'No ID'});
    return;
  }
   res.status(200).json(tagData); 
  } catch (err) {
    console.log(err);
    res.status(500).json(err); 
    
  }
});

module.exports = router;
