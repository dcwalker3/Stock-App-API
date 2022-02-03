const express = require('express');
const router = express.Router();

const axios = require('axios');

const auth = require('../Scripts/Auth');

require('dotenv').config();

const stockFunctions = require('../RouteFunctions/StockFunctions');

// Get basic stock information
router.post('/', ((req, res) => {
    auth.isAuthorized(req.body.token, req.body.email, function(isAuthed){
        if(isAuthed){
            // Get Quote
            stockFunctions.Quote(req.body.ticker, function(respone){
                if(respone){
                    res.status(200).json({data: respone});
                } else{
                    res.status(404).json("ERROR OCCURRED!!!");
                }
            })
        } else{
            res.status(401).json('Unauthorized User!');
        }
    })
}));

router.post('/add', (((req, res) => {
    auth.isAuthorized(req.body.token, req.body.email, function(isAuthed) {
        if(isAuthed){
            for(let stock in req.body.stocks){
                console.log("Stock: "+stock);
            }
        }
        else{
            console.log(req.body.email);
            res.status(401).json("Unauthorized User!!")
        }
    })
})))



module.exports = router;