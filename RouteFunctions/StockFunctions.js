const axios = require("axios");
require('dotenv').config();

const Stock = require('../Schemas/Stock.schema');

const apiKey = process.env.FINNHUB_API_KEY;

function Quote(ticker, callback) {
    console.log("Starting Quote");
    getStock(ticker, function (exists) {
        if(exists){
            console.log(exists);
            callback(exists)
        } else {
            axios
                .get(`https://finnhub.io/api/v1/quote?symbol=${ticker.toUpperCase()}&token=${apiKey}`)
                .then(function (response) {
                    addStock(ticker, response.data, function(success){
                        if(success){
                            callback(response.data)
                        } else{
                            callback(false)
                        }
                    })
                })
                .catch(function (error) {
                    console.log(error);
                    // Send error information.
                    callback(false)
                })
        }
    })
}

// FIXME: Returns the data as an error. Does it even when switched.
function getStock(ticker, callback){
    Stock.findOne({stockSymbol: ticker}, function (data, err){
        if(data){
            callback(data)
        } else{
            callback(false)
        }
    })
}

function addStock(ticker,data, callback){

        const stock = new Stock({
            stockSymbol: ticker,
            price: data["c"],
            change: data["d"],
            dailyChange: data["dp"],
            openPrice: data["o"],
            closePrice: data["pc"],
            high: data["h"],
            low: data["l"]
        });

        stock.save(function (err){
            if(err){
                callback(false)
            } else{
                callback(true)
            }
        })

}

module.exports = {
    Quote,
    addStock,
    getStock
}