import express from 'express';
import orderController from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.route('/order')
.get((req,res)=> orderController.getOrders(req,res))
.post((req,res)=> orderController.createOrder(req,res))


orderRouter.route('/order/:id')
.put((req,res)=> orderController.updateOrderById(req,res))
.get((req,res)=> orderController.getOrder(req,res))
.delete((req,res)=> orderController.deleteOrderById(req,res))

export default orderRouter