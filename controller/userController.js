import UserModel from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import hiveController from './hiveController.js'
dotenv.config();

export default { // WIP


    create:function(req,res){
        const userId = req.body.id; //TODO <---niamo se jwt
        const username = req.body.username;
        const password = req.body.password;
        const mail = req.body.mail;
        const settings = req.body.settings;
    
        const user = new UserModel(null,username,password,mail,settings);
        user.insert()
        .then(user => {return res.status(200).json(user)})
        .catch(err => {
            console.log(err);
            res.status(500).send("Napaka pri ustvarjanju user");
        });
      },
    // Ta funckcija se uporablja za login
    // pridobi podatke username in passoword iz request.body
    login : function(req, res, next){
        const password = req.body.password
        const username = req.body.username
        if (password === null || username === null || password == undefined || username == undefined){ // uporabnik ni poslal username/password
            return res.status(400).json({error:'Missing password or username'})
        }

        UserModel.getByUsername(req.body.username).then( user => {
            if (user.length < 1){ // preveri če obstaja user...
                return res.status(403).json({error:'username or password is incorrect'})
            }
            if (bcrypt.compare(password,user.password)){ // preveri ce je geslo ok
                const payload = {username:username,group:"not implemented", id:user.id}
                console.log("Succesful login")
                return res.status('200').json( // vrne token
                    {token: jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60)*12, //12 ur trajanja
                            data: payload
                        },process.env.JWT_SECRET)})
            }
            return res.status(403).json({error:'username or password is incorrect'})
        }).catch(error => {
            console.log("Login error: ",error)
            return res.status(500).json({error: 'error logging in'})
        })
    },
    //funckija za registracijo
    //pridobi username, password, email od registracije.
    register: function(req,res,next){
        const password = req.body.password
        const username = req.body.username
        const email = req.body.email
        console.log(req.body)
        if (password == undefined || username == undefined || email == undefined){
            console.log("missing fields")
            return res.status(400).json({error: "Missing required fields"})
        }



        //TODO preveri varnost gesla, validiraj e   mail

        UserModel.getByUsername(req.body.username).then(user =>{
            if (user.length > 0){
                console.log("user already exists")
                //return res.json({error: "Username already exists!"},400)
            }

            console.log("user",user)
            bcrypt.genSalt(10, function(err, salt) {
                if (err){
                    console.log(err)
                    res.status(500).json("Error registering user")
                }
                bcrypt.hash(password, salt, function(err, hash) {
                    if (err){
                        console.log(err)
                        res.status(500).send("Error registering user")
                    }
                    const userInsert = new UserModel(null, username, password, email, {});
                    userInsert.password = hash;
                    userInsert.insert().then(() => {
                        return res.status(200).json({message: "User registered succesfully"})
                    }).catch((err) => {
                        console.log(err)
                        return res.status(500).json({error: "user register failed"})
                    })
                });
            });
        }).catch(err => {
            console.log("error in register user")
            console.log(err)
            //return res.status(500).send("Error registering user")
        })
        console.log("end of register")
    },


    list:function(req,res){
        UserModel.getAll()
        .then(user=>{
          return res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("Napaka pri list user");
        });
      },
    


    show:function(req,res){
        const userId = req.params.id;
        UserModel.getById(userId)
            .then(user => {
                return res.status(200).json(user);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send("Napaka pri show user");
            });
    },
    update: function(req,res){
        const userId = req.params.id || req.body.id;
        const username = req.body.username ?? null;
        const password = req.body.password ?? null;
        const mail = req.body.mail ?? null;
        const settings = req.body.settings ?? null;

        const user = new UserModel(userId,username,password,mail,settings);
        user.update()
            .then(user => {return res.status(200).json(user)})
            .catch(err => {
                console.error(err);
                return res.status(500).send("Napaka pri posodabljanju user");
            });
    },
    remove:function(req,res){
        const userId = req.params.id ?? req.body.id;
        UserModel.deleteById(userId)
            .then(()=> {return res.status(200).send("Uspesno zbrisan user")})
            .catch(err => {
                console.error(err);
                return res.status(500).send("Napaka pri brisanju user");
            });
    }
}
