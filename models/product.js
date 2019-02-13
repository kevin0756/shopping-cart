const mongoose = require('mongoose');

const Schema = mongoose.Schema,
  model = mongoose.model.bind(mongoose),
  ObjectId = mongoose.Schema.Types.ObjectId;

const shoppingCartSchema = new Schema({
	  _id: ObjectId,
	  productName: String,
	  productPrice: Number,
	  productQuantity: Number,
	  total: Number,
	});


const ShoppingCart = model('ShoppingCart', shoppingCartSchema);

module.exports = {
		ShoppingCart
};