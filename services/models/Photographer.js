const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  date: String,
});

const photographerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  location: String,
  price: Number,
  rating: Number,
  styles: [String],
  tags: [String],
  bio: String,
  profilePic: String,
  portfolio: [String],
  reviews: [reviewSchema],
});

module.exports = mongoose.model('Photographer', photographerSchema);