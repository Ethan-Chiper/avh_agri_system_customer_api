const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const customerSchema = new mongoose.Schema({
    customer_id: { type: String },
    customerName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: {
        line1: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true }
    },
    products: [
        {
            productId: { type: String },
            productName: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }
        }
    ],
    transaction: {
        totalAmount: { type: Number, required: true },
        paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failure'], default: 'Pending' },
        purchaseDate: { type: Date, default: Date.now }
    }
});
customerSchema.plugin(timestamps);
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
