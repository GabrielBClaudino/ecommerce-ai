import Order from '../models/order.js'
const orderController={
    getOrders: async (req,res) =>{
        try {
            const orders = await Order.find();
            res.status(200).send(orders);    
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    getOrderById: async (req,res) =>{
        try {
            const order = await Order.findById(req.params.id);
            res.status(200).send(order);    
        } catch (error) {
            res.status(500).send({ message: error.message })
        }        
    },
    createOrder: async (req,res) =>{
        try {
            const newOrder = await Order.create(req.body);
            res.status(201).send(newOrder);    
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    updateOrder: async (req,res) =>{
        try {
            const updateOrder = await Order.findByIdAndUpdate(req.params.id,req.body,{ new : true });  
            res.status(200).send(updateOrder);
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    },
    deleteOrderById: async (req,res) =>{
        try {
            const deleteOrder = await Order.findByIdAndDelete(req.params.id);
            res.status(200).send(deleteOrder)
        } catch (error) {
            res.status(500).send({ message: error.message })
        }
    }
    
}
export default orderController;