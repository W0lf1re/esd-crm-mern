const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        min: [2, 'First name must be at least 2 characters long'],
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: [6, 'Password must be at least 6 characters long'],
    },
    customers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Customer'
        }
    ]
})

userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

module.exports = mongoose.model('User', userSchema);