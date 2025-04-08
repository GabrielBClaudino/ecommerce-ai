import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    created_at:{type: Date, default: Date.now},
    updated_at:{type: Date, default: Date.now}
})

const Product = mongoose.model('Product', schema);
export default Product;