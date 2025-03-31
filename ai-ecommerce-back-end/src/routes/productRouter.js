
import express from 'express';
import productController from '../controllers/productController.js'

const productRouter = express.Router()

productRouter.route('/product')
.get((req,res)=> productController.getProducts(req,res))
.post((req,res)=> productController.createProduct(req,res))


productRouter.route('/product/:id')
.put((req,res)=> productController.updateProductById(req,res))
.get((req,res)=> productController.getProduct(req,res))
.delete((req,res)=> productController.deleteProductById(req,res))

export default productRouter