const express = require('express');
const router = express.Router();

const inventoryController = require('../controllers/shoppingCartAPI')

router.get('/fetch-all-products/', inventoryController.fetchAllProducts);
router.get('/fetch-product-by-name/:productName', inventoryController.fetchProductByName);
router.post('/save-product/', inventoryController.addProduct);
router.delete('/delete-product-by-id/:productId/', inventoryController.deleteProductById);

module.exports = router;