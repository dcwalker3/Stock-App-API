const express = require('express');
const router = express.Router();

const axios = require('axios');

// Authentication Script
const auth = require('../Scripts/Auth');

require('dotenv').config();

// API key to finnhub.
const apiKey = process.env.FINNHUB_API_KEY;

// Get basic stock information
router.get('/quote/', ((req, res) => {

    // Check Authorization
    auth.isAuthorized(req.body.token, req.body.email, function(isAuthed){
        // If Authorized
        if(isAuthed){

            // Launch axios request.
            axios
                .get(`https://finnhub.io/api/v1/quote?symbol=${req.body.ticker}&token=${apiKey}`)
                .then(function (response) {
                    // Send response data.
                    res.status(200).json({data: response.data});
                })
                .catch(function (error) {
                    // Send error information.
                    res.status(404).json({error: error})
                })
        } else{
            // Tell the client the user is unauthorized.
            res.status(401).json('Unauthorized User!');
        }
    })
}));

module.exports = router;