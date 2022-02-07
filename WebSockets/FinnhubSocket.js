require('dotenv').config()
const Portfolio = require('../Schemas/Portfolio.schema');
const ws = require("ws");
const e = require("express");

const apiKey = process.env.FINNHUB_API_KEY;


const socket = new ws.WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);


socket.addEventListener('message', function (event) {
    console.log("EVENT")
    console.log(`Message from server:
    \nsymbol: ${event.data}
     `);
});


setInterval(function (){
    let stocks = []
    Portfolio.find({}, function(err, results){
        if(err){
            console.log(err);
        } else{
            if(results !== null){
                stocks.push(
                    "VOO",
                    "AAPL",
                    "TSLA",
                    "FB",
                    "MSFT"
                );
            }
            else{
                stocks.push(
                    "VOO",
                    "AAPL",
                    "TSLA",
                    "FB",
                    "MSFT"
                )
            }
        }
        for(let stock in stocks){
            socket.send(JSON.stringify({
                "type": "subscribe",
                "symbol": stocks[stock]
            }))
        }
        stocks = [];

    })



}, 5000)




function findMostCommon(data, keyToSearch){
    data.map(dataPoint => {
        console.log(dataPoint);
    })
}