const express = require('express');
const router = express.Router();
const Photographer = require('../models/Photographer');

router.get('/', async (req, res) => {
  try {
    const { search, city, minPrice, maxPrice, rating, styles, sort, page = 1, limit = 10 } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    if (city) query.location = city;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (rating) query.rating = { $gte: Number(rating) };
    if (styles) {
      const stylesArray = styles.split(',').map((s) => s.trim());
      query.styles = { $in: stylesArray };
    }

    let sortOption = {};
    if (sort === 'priceAsc') sortOption.price = 1;
    else if (sort === 'priceDesc') sortOption.price = -1;
    else if (sort === 'ratingDesc') sortOption.rating = -1;
    else if (sort === 'recent') sortOption.id = -1;

    const skip = (page - 1) * limit;
    const photographers = await Photographer.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Photographer.countDocuments(query);
    res.json({ photographers, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const photographer = await Photographer.findOne({ id: req.params.id });
    if (!photographer) return res.status(404).json({ error: 'Photographer not found' });
    res.json(photographer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;