const adminKey = require('./firebase/service-account.json');
const admin = require('firebase-admin');
const morgan = require('morgan');
const fs = require('fs');

require('dotenv').config();

// Server initialized
const express = require('express');
const app = express();

// CORS middleware
const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3000'
}));


// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(__dirname + '/access.log',{flags: 'a'});
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

const stocks = require('./Routes/Stocks');
const portfolio = require('./Routes/Portolio');

// Include routes to apps.
app.use('/stock', stocks);
app.use('/portfolio', portfolio);

// Tell server to listen on port.
app.listen(port, () => {
    // When Server Starts
    console.log(`Server Listening on Port: ${port}...`);

    mongoose.connect(connection_string)
        .then(console.log(`Connected to ${db_name}`));
})
