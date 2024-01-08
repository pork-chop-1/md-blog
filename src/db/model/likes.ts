import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  slug: String,
  count: Number,
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
