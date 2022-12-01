const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    enterprise: String,
    invoices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Invoice'
        }
    ],
    totalAmount: Number
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }
})

module.exports = mongoose.model('Customer', customerSchema);