import HiveModel from "../model/hiveModel.js";

const HiveController = {

  create:function(req,res){
    const name = req.body.name;
    const location = req.body.location;
    const type = req.body.type;
    const status = req.body.status;
    const userId = req.body.id; //TODO <---niamo se jwt

    const hive = new HiveModel(null,name,location,type,status, userId, userId, userId);
    hive.insert()
    .then(hive => {return res.status(200).json(hive)})
    .catch(err => {
        console.log(err);
        res.status(500).send("Napaka pri ustvarjanju hajva");
    });
  },

  list:function(req,res){
    HiveModel.getAll()
    .then(hive=>{
      return res.status(200).json(hive);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Napaka pri list hajva");
  });
  },

  show:function(req,res){
    const hiveId = req.params.id;
    HiveModel.getById(hiveId)
    .then(hive => {
      return res.status(200).json(hive);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Napaka pri show hive");
  });
  },

  update: function(req,res){
    const hiveId = req.params.id || req.body.id;
    const name = req.body.name ?? null;
    const location = req.body.location ?? null;
    const type = req.body.type ?? null;
    const status = req.body.status ?? null;
    const id_location = req.body.id_location ?? null;
    const id_notes = req.body.id_notes ?? null;
    const id_user = req.body.id_user ?? null;

    const hive = new HiveModel(hiveId,name,location,type,status,id_location,id_notes,id_user);
    hive.update()
    .then(hive => {return res.status(200).json(hive)})
    .catch(err => {
      console.error(err);
      return res.status(500).send("Napaka pri posodabljanju hive");
    });
  },

  remove:function(req,res){
    const hiveId = req.params.id ?? req.body.id;
    HiveModel.deleteById(hiveId)
    .then(()=> {return res.status(200).send("Uspesno zbrisan panj")})
    .catch(err => {
      console.error(err);
      return res.status(500).send("Napaka pri brisanju hive");
    });
  },

  search:function(req,res){
    const name = req.body.name;
    HiveModel.search(name)
    .then((hives)=> {return res.status(200).json(hives)})
    .catch(err =>{
      console.log(err);
      return res.status(500).send("Napaka pri iskanju panjev");
    })
  }

}

export default HiveController;