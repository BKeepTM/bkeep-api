var userModel = require("../model/userModel")
var bcrypt =  require('bcrypt')
module.exports = { // WIP
    // Ta funckcija se uporablja za login
    // pridobi podatke username in passoword iz request.body
    login : function(req, res, next){
        const password = req.body.password
        const username = req.body.username
        if (password === null || username === null){ // uporabnik ni poslal username/password
            return res.status(400).json({error:'Missing password or username'})
        }
        
        const user = userModel.User.getByUsername(req.body.username)

        if (user === null){ // preveri če obstaja user...
            return res.status(403).json({error:'username or password is incorrect'})
        }

        if (bcrypt.compare(password,user.password)){
            return res.status('200').json({token: ""})
        }
        return res.json({test:"not implemented"})

    }
}