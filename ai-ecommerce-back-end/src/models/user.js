import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
// Antes de salvar, transformar a senha em hash
schema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hashedPassword) => {
            if (err) next(err);
            else {
                this.password = hashedPassword;
                next();
            }
        });
    }
});

schema.methods.isCorrectPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, same) => {
        if (err) callback(err);
        else callback(null, same);
    });
};


const User = mongoose.model('User', schema);
export default User;