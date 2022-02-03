const express = require('express');
const router = express.Router();

const portfolioFunctions = require('../RouteFunctions/PortfolioFunctions');

const auth = require('../Scripts/Auth');



router.post('/getByEmail', ((req, res) => {
    auth.isAuthorized(req.body.token, req.body.email, function(isAuthed){
        if(isAuthed){
            // Get the portfolio
            portfolioFunctions.getPortfolio(req.body.email, function (data) {
                if(data){
                    res.status(200).json(data);
                } else {
                    if (data === null) {
                        res.status(205).json('No Portfolio Found')
                    } else {
                        res.status(404).json('ERROR OCCURRED!!!');

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
            // Adds Portfolio to the Database.
            // Callback true or false.
            portfolioFunctions.createPortfolio(req.body.email, req.body.portfolio, function(success){
                if(success){
                    res.status(200).json(`Portfolio created for ${req.body.email}`);
                } else{
                    res.status(404).json('ERROR OCCURRED!!!');
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
            portfolioFunctions.deletePortfolio(req.body.email, function (success){
                if(success){
                    res.status(200).json(`User ${req.body.email} successfully deleted.`);
                } else{
                    res.status(404).json('ERROR OCCURRED!!!');
                }
            })
        } else{
            res.status(401).json('Unauthorized User!')
        }
    })
})

module.exports = router;
