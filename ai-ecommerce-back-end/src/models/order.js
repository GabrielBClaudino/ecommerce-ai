import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    products: [{productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'}, name: { type: String, required: true }, price: { type: Number, required: true }}],
    totalAmount: { type: Number},
    createdAt: { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', schema);

export default Order;