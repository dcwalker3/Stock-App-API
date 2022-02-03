const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    stockSymbol: {
        type: String,
        required: true,
        unique: true,
        minLength: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    high: {
        type: Number,
        min: 0
    },
    low: {
        type: Number,
        min: 0
    },
    openPrice: {
        type: Number,
        min: 0
    },
    closePrice: {
        type: Number,
        min: 0
    },
    change:{
        type: Number
    },
    dailyChange: {
        type: Number
    }
}, {timestamps: true});

const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;