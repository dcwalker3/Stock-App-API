const Portfolio = require('../Schemas/Portfolio.schema');

// Create Portfolio Function
function createPortfolio(email, portfolio, callback){

    // Creates portfolio document to add to mongodb.
    const userPortfolio = new Portfolio({
        email: email,
        portfolio: portfolio
    })

    // Save portfolio to the db.
    userPortfolio.save(function(err){
       if(err){
           // Callback false to indicate an error.
           callback(false)
       } else{
           // Callback true to indicate success.
           callback(true)
       }
    });
}

// Get a User from our DB based off email.
function getPortfolio(email, callback){

    // Use mongoose function to find user based off email.
    Portfolio.findOne({email: email}, function (err, user){
        if(err){
            callback(false);
        } else{
            if(user === null){
                callback(null)
            } else {
                // Callback user.portfolio since that is all we need.
                callback(user.portfolio);
            }
        }
    })
}


function deletePortfolio(email, callback) {
    Portfolio.deleteOne({email: email}, function (err) {
        if(err){
            callback(false)
        } else{
            callback(true)
        }
    })
}

module.exports = {
    createPortfolio,
    getPortfolio,
    deletePortfolio
}