const axios = require("axios");
require('dotenv').config();

const apiKey = process.env.FINNHUB_API_KEY;

function Quote(ticker, callback) {
    axios({
        method: "GET",
        url: `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${apiKey}`
    })
        .then(response => {
            callback(response);
        })
        .catch(callback(false));

}

module.exports = {
    Quote
}