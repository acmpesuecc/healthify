
module.exports  = {
    saltRounds: 3, 
    issuer: 'Healthify Server', 
    signOptions: {
        issuer:  "Healthify Login Credentials",
        expiresIn:  "24h",
    },
    verifyOptions: {
        issuer:  "Healthify Login Credentials",
        expiresIn:  "24h",
       }
}