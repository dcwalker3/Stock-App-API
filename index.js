const adminKey = require('./firebase/service-account.json');
const admin = require('firebase-admin');
const morgan = require('morgan');
const fs = require('fs');
const WebSocket = require('ws');

require('dotenv').config();

// Server initialized
const express = require('express');
const app = express();

// TODO: Make a whitelist for origin.
// CORS middleware
const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3000'
}));


// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
// setup the logger
app.use(morgan('combined', {stream: accessLogStream}))


// Firebase-Admin Initialize
admin.initializeApp({
    // Add the account keys.
    credential: admin.credential.cert(adminKey)
});


// Enable json for req and res on server
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// MongoDB's functionality.
const mongoose = require('mongoose');

// .env Variables
const port = process.env.PORT;
const connection_string = process.env.DB_CONNECTION_STRING;
const db_name = process.env.DB_NAME;
const api_key = process.env.FINNHUB_API_KEY;

require('./Scripts/Socket');

// TODO: Implement the WebSocket below on the backend and connect to DB so we can query it.
/*
const socket = new WebSocket(`wss://ws.finnhub.io?token=${api_key}`);

// Connection opened -> Subscribe
socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
    socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

// Unsubscribe
var unsubscribe = function(symbol) {
    socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
}
 */

require('./WebSockets/FinnhubSocket');

// Routes
const stocks = require('./Routes/Stocks');
const portfolio = require('./Routes/Portolio');

// Include routes to apps.
app.use('/stock', stocks);
app.use('/portfolio', portfolio);

// Tell server to listen on port.
app.listen(port || 8080, () => {
    // When Server Starts
    console.log(`Server Listening on Port: ${port}...`);

    mongoose.connect(connection_string)
        .then(console.log(`Connected to ${db_name}`));
})
