import HiveWeightModel from "../model/hiveWeightModel.js";

const HiveWeightController = {

  create:function(req,res){
    const hiveWeightId = req.body.id; //TODO <---niamo se jwt
    const weight = req.body.username;
    const timeWeight = req.body.password;
    //ID HIVE TODO

    const hiveWeight = new HiveWeightModel(null,weight,timeWeight,hiveWeightId);
    hiveWeight.insert()
    .then(hiveWeight => {return res.status(200).json(hiveWeight)})
    .catch(err => {
        console.log(err);
        res.status(500).send("Napaka pri ustvarjanju hiveWeight");
    });
  },

  list:function(req,res){
    HiveWeightModel.getAll()
    .then(hiveWeight=>{
      return res.status(200).json(hiveWeight);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Napaka pri list hiveWeight");
    });
  },

  show:function(req,res){
    const hiveWeightId = req.params.id;
    HiveWeightModel.getById(hiveWeightId)
    .then(hiveWeight => {
      return res.status(200).json(hiveWeight);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Napaka pri show hiveWeight");
    });
  },

  update: function(req,res){
    const hiveWeightId = req.params.id || req.body.id;
    const weight = req.body.weight ?? null;
    const timeWeight = req.body.timeWeight ?? null;
    const idHive = req.body.idHive ?? null;

    const hiveWeight = new HiveWeightModel(hiveWeightId,weight,timeWeight,idHive);
    hiveWeight.update()
    .then(hiveWeight => {return res.status(200).json(hiveWeight)})
    .catch(err => {
      console.error(err);
      return res.status(500).send("Napaka pri posodabljanju hiveWeight");
    });
  },

  remove:function(req,res){
    const hiveWeightId = req.params.id ?? req.body.id;
    HiveWeightModel.deleteById(hiveWeightId)
    .then(()=> {return res.status(200).send("Uspesno zbrisan hiveWeight")})
    .catch(err => {
        console.error(err);
        return res.status(500).send("Napaka pri brisanju hiveWeight");
      });
  }

}

export default HiveWeightController;