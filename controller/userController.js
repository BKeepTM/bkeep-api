var userModel = require("../model/userModel")
var bcrypt =  require('bcrypt')
var jwt = require('jsonwebtoken') // ta se uporablja za kreiranje tokenov, ovi drugi pa je za preverjanje samo.
var dotenv = require('dotenv')
const { default: User, default: User } = require("../model/userModel")
dotenv.config();
module.exports = { // WIP
    // Ta funckcija se uporablja za login
    // pridobi podatke username in passoword iz request.body
    login : function(req, res, next){
        const password = req.body.password
        const username = req.body.username
        if (password === null || username === null){ // uporabnik ni poslal username/password
            return res.status(400).json({error:'Missing password or username'})
        }
        
        const user = User.getByUsername(req.body.username)

        if (user === null){ // preveri če obstaja user...
            return res.status(403).json({error:'username or password is incorrect'})
        }

        if (bcrypt.compare(password,user.password)){ // preveri ce je geslo ok
            const payload = {username:username,group:"not implemented", id:user.id}
            return res.status('200').json( // vrne token
                {token: jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60)*12, //12 ur trajanja
                    data: payload
                    },process.env.JWT_SECRET)}) 
        }
        return res.status(403).json({error:'username or password is incorrect'})

    },
    //funckija za registracijo
    //pridobi username, password, email od registracije.
    register: function(req,res,next){
        const password = req.body.password
        const username = req.body.username
        const email = req.body.email
        if (password === null || username === null || email === null) 
            return res.status(400).json({error: "Missing required fields"})

        //TODO preveri varnost gesla, validiraj e   mail

        const userExists = User.getByUsername(req.body.username)
        if (userExists !== null)
            return res.status(400).json({error: "Username already exists!"})
        
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                var user = new User(null,username,password,email,{});
                user.password = hash;
                user.insert();
            });
        });

    }
}