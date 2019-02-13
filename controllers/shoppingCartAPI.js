var Model = require('../models/product');
const {ShoppingCart} = Model;
const mongoose = require('mongoose')
var ObjectID = require('mongodb').ObjectID;

const shoppingCartController = {
		
		fetchProductByName (req, res) {
			console.log('fetchProductByName()')
			try{
				ShoppingCart.findOne({productName: req.params.productName}, (err, obj) => {
			      if (err) {
			        res.status(500).send(err);
			      } else {
			        res.json(obj);
			      }
			})
			}catch(err){
				console.log('Error occurred in fetchProductByName() ' + err);
				res.status(500).send("Error occured while fetching product");
			}
		},
		
		fetchAllProducts (req, res) {
			console.log('fetchAllProducts()')
			try{
				ShoppingCart.find({}, (err, inventoryProducts) => {
			      if (err) {
			        res.status(500).send(err);
			      } else {
			        res.send(inventoryProducts);
			      }
			})
			}catch(err){
				console.log('Error occurred in fetchAllProducts() ' + err);
				res.status(500).send("Error occured while fetching inventory products");
			}
		},
		
		addProduct(req, res) {
			console.log('addProduct()');
			
			try{
				var productDetails = req.body;
				ShoppingCart.findOne({productName: productDetails.productName}, (err, obj) => {
				      if (err) {
				        res.status(500).send(err);
				      } else {
			        	if(obj)
			        		updateProduct(productDetails, res)
		        		else{
		        			var newShoppingCart = new ShoppingCart({
		  			    	  _id: mongoose.Types.ObjectId(),
		  			    	  productName: productDetails.productName,
		  			    	  productPrice: productDetails.productPrice,
		  			    	  productQuantity: productDetails.productQuantity, 
		  					  total: productDetails.total,    	   
		  			       });
		  				
		  				newShoppingCart.save((err, savedObj) => {
		  		    	   	   if (err) {
		  		    	   		   console.log(err);
		  		    	   		   throw err;
		  		    	   	   }
		  		    	   	   else{
		  		    	   		   var copy = Object.assign({}, savedObj._doc); // the returned object is immutable 
								   copy.updated = false;
		  		    	  		   res.status(201).json(copy);
		  		    	   	   }
		  		    	   	 });
		        		}
				      }
				});
				
				
			}catch(err){
				console.log('Error in shoppingCartAPI.addProduct() ' + err);
				res.status(500).send("Error occured " + err);
			}
			
		},
		
		deleteProductById (req, res) {
			console.log('deleteProductById()')
			try{
				console.log(req.params.productId)
				ShoppingCart.remove({'_id': new ObjectID(req.params.productId)}, (err, deletedItem) => {
			      if (err) {
			        res.status(500).send(err);
			      } else {
			        res.send("Product with id " + req.params.productId + " deleted successfully");
			      }
			})
			}catch(err){
				console.log('Error occurred in deleteProductById() ' + err);
				res.status(500).send("Error occured while deleting product with id " + req.params.productId);
			}
		}
		
}

function updateProduct(productDetails, res){
	console.log('updateProduct()');
	var options = {new: true};
	ShoppingCart.findOneAndUpdate({productName: productDetails.productName},{$inc: {productQuantity: productDetails.productQuantity, total: productDetails.total}}, options, function(err, product){
			  if(err){ 
				  console.log('error while updating ' + err);
				  res.status(500).send("Error while updating product " + productDetails.productName)
			  }else{
				  var copy = Object.assign({}, product._doc); // the returned object is immutable 
				  copy.updated = true;
				  res.json(copy);
			  }
		});
}

module.exports = shoppingCartController;