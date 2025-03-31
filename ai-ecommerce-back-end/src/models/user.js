import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    cpf: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'CLIENT'},

    created_at:{type: Date, default: Date.now},
    updated_at:{type: Date, default: Date.now}
})

const User = mongoose.model('User', schema);
export default User;