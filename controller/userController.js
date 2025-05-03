import UserModel from "../model/userModel.js";

const UserController = {

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

export default UserController;