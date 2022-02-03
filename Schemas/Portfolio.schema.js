const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for a Stock the User Posses.
/*
 * I created a new schema instead of using the stock schema due to
 * we need less information for this schema. For example, we only need symbol and amount
 * because we can then request additional data from our Stock Collection.
 */
const subSchema = new Schema({
    stockSymbol: {
        type: String,
        required: true,
        minLength: 1
    },
    shareAmount: {
        type: String,
        required: true
    }
})

const PortfolioSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    // Portfolio should be a json object of stock holdings.
    /*
     * i.e.
     * portfolio: {
     *  "AAPL": 2.6,
     *  "MSFT": 1.3
     * }
     */
    portfolio: {
        type: [subSchema],
        required: true
    }
}, {timestamps: true});


const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;