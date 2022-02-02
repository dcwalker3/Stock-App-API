const express = require('express');
const router = express.Router();

const Portfolio  = require("../Schemas/Portfolio.schema");

const auth = require('../Scripts/Auth');


router.post('/getByEmail', ((req, res) => {
    auth.isAuthorized(req.body.token, req.body.email, function(isAuthed){
        if(isAuthed === true){
    
            // Query MongoDB based off email we receive.
            Portfolio.findOne({email: req.body.email}, function (error, results) {
                // Error Handling
                if(error){
                    res.status(404).json({error: error});
                }
                // Send the portfolio.
                else {
                    if(results){
                        res.status(200).json(results.portfolio);
                    } else{
                        res.status(205).json("No Portfolio Found!");
                    }
                }
            })
        } else {
            res.status(401).json('Unauthorized User!');
        }
    }) 
}))

router.post('/', (req, res) => {
    auth.isAuthorized(req.body.token, req.body.email, function(isAuthed){
        if(isAuthed){
            // Create Portfolio
            const portfolio = new Portfolio({
                // JSON we receive.
                email: req.body.email,
                portfolio: req.body.portfolio
            });

            // Save Portfolio
            portfolio.save(function (err) {

                // If there is an error.
                if(err){

                    // If duplicate entry error.
                    // error code 11000 can be others involving key indexing, but this is the most common.
                    if (err.code === 11000){
                        return res.status(500).json("User already has a portfolio!");
                    } else{
                        // Other errors.
                        return res.status(404).json({error: err});
                    }
                }
                // No errors then all clear.
                else {
                    const user = new User({
                        email: req.body.email
                    })
                    return res.status(200).json(`User ${portfolio.email}'s Portfolio has been Added!`)
                }
            })
        } else{
            res.status(401).json('Unauthorized User!')
        }
    })
});

router.delete('/', (req, res) => {
    auth.isAuthorized(req.body.token, req.body.email, function(isAuthed){
        if(isAuthed){
            Portfolio.deleteOne({email: req.body.email}, function(err){
                if(err){
                    res.status(404).json({error: err});
                } else{
                    res.status(200).json(`User ${req.body.email}'s portfolio has been Deleted!`)
                }

            })
        } else{
            res.status(401),json('Unauthorized User!')
        }
    })
})

module.exports = router;
