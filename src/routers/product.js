
const express = require('express')
const productRouter = express.Router()
const productController = require('./../controllers/products')
const upload = require('../middlewares/upload')

productRouter

        .get('/',  productController.getAllProducts)
        .post('/', upload ,productController.createProduct)
        .patch('/:id', upload ,productController.updateProduct)
        .delete('/:id',productController.deleteProduct)



module.exports = productRouter