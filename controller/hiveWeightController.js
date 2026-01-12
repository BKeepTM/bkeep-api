import HiveWeightModel from "../model/hiveWeightModel.js";

const HiveWeightController = {

  create:function(req,res){
    const hiveId = req.body.hiveId;
    const weight = req.body.weight;
    const timeWeight = req.body.timeWeight; //todo api kljue za tezo

    const hiveWeight = new HiveWeightModel(null,weight,timeWeight,hiveId);
    hiveWeight.insert()
    .then(hiveWeight => {return res.status(200).json(hiveWeight)})
    .catch(err => {
        console.log(err);
        res.status(500).send("Napaka pri ustvarjanju hiveWeight");
      });
  },

  createAdmin: function (req, res) {
    const hiveId = req.body.hiveId;
    const weight = req.body.weight;
    const timeWeight = req.body.timeWeight;

    const hiveWeight = new HiveWeightModel(null, weight, timeWeight, hiveId);
    hiveWeight
      .insert()
      .then((hiveWeight) => {
        return res.status(200).json(hiveWeight);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Napaka pri ustvarjanju hiveWeight");
      });
  },

  listByUser: function (req, res) {
    const userId = req.auth.data.id;
    HiveWeightModel.getAllByUserId(userId)
      .then((hiveWeight) => {
        return res.status(200).json(hiveWeight);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Napaka pri list hiveWeight");
      });
  },
  list: function (req, res) {
    const userId = req.auth.data.id;
    HiveWeightModel.getAll()
      .then((hiveWeight) => {
        return res.status(200).json(hiveWeight);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Napaka pri list hiveWeight");
      });
  },
  show: function (req, res) {
    const userId = req.auth.data.id;
    const hiveWeightId = req.params.id;
    HiveWeightModel.getById(userId, hiveWeightId)
      .then((hiveWeight) => {
        return res.status(200).json(hiveWeight);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Napaka pri show hiveWeight");
      });
  },

  update: function (req, res) {
    const hiveWeightId = req.params.id || req.body.id;
    const weight = req.body.weight ?? null;
    const timeWeight = req.body.timeWeight ?? null;
    const idHive = req.body.idHive ?? null;

    const hiveWeight = new HiveWeightModel(
      hiveWeightId,
      weight,
      timeWeight,
      idHive
    );
    hiveWeight
      .update()
      .then((hiveWeight) => {
        return res.status(200).json(hiveWeight);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send("Napaka pri posodabljanju hiveWeight");
      });
  },

  remove: function (req, res) {
    const hiveWeightId = req.params.id ?? req.body.id;
    HiveWeightModel.deleteById(hiveWeightId)
      .then(() => {
        return res.status(200).send("Uspesno zbrisan hiveWeight");
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send("Napaka pri brisanju hiveWeight");
      });
  },
};

export default HiveWeightController;
