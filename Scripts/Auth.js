const admin = require('firebase-admin');

function isAuthorized(token, email, callback) {
    admin
        .auth()
        .verifyIdToken(token)
            .then(userToken => {
                if(userToken.email === email){
                    callback(true);
                } else {
                    callback(false);
                }
            })
            .catch(error => {
                console.log(error);
                callback(false)
            });
}

module.exports = {isAuthorized};