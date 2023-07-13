const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tags = await Tag.findAll({
      include: [{ model: Product }],
    });

    res.json({ message: 'Successfully retrieved tags', data: tags });
  } catch (err) {
    res.json({ message: 'Failed to retrieve tags', error: err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its `id` and include associated Product data
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tag) {
      res.json({ message: 'Tag not found' });
      return;
    }

    res.json({ message: 'Successfully retrieved tag', data: tag });
  } catch (err) {
    res.json({ message: 'Failed to retrieve tag', error: err });
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const tag = await Tag.create(req.body);
    res.json({ message: 'Tag created successfully', data: tag });
  } catch (err) {
    res.json({ message: 'Failed to create tag', error: err });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    const updatedTag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedTag[0]) {
      res.json({ message: 'Tag not found' });
      return;
    }

    res.json({ message: 'Tag updated successfully' });
  } catch (err) {
    res.json({ message: 'Failed to update tag', error: err });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a tag by its `id` value
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id },
    });

    if (!deletedTag) {
      res.json({ message: 'Tag not found' });
      return;
    }

    res.json({ message: 'Tag deleted successfully' });
  } catch (err) {
    res.json({ message: 'Failed to delete tag', error: err });
  }
});

module.exports = router;
