const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    tenantId: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        default: () => {
            const now = new Date();
            const timezoneOffsetMinutes = now.getTimezoneOffset();
            return new Date(now.getTime() - timezoneOffsetMinutes * 60000);
    }
    },
    status: {
        type: String,
        enum: ['En Curso', 'Cerrado'],
        default: 'En Curso'
    },
    client: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    items: [
        {
            name: String,
            quantity: Number,
            price: Number
        }
    ]
});

module.exports = mongoose.model('Order', OrderSchema);
