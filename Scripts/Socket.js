require('dotenv').config();
const WebSocket = require('ws');
const Stock  = require("../Schemas/Stock.schema");

// API key to finnhub.
const apiKey = process.env.FINNHUB_API_KEY;

const socket = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

function manageSockets(){

}

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
});




// Unsubscribe
var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}