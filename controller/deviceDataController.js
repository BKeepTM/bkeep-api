import deviceDataModel from "../model/deviceDataModel.js";

const deviceDataController = {

  create:function(req,res){
    const id_user = req.auth.data.id;
    const time = req.body.time;
    const humidity = req.body.humidity;
    const brightness = req.body.brightness;
    const temperature = req.body.temperature;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    console.log(req.body);
    console.log("xd")
    let deviceData = new deviceDataModel(null,humidity, brightness, temperature, longitude, latitude , time, id_user);
    deviceData.insert()
    .then(deviceData => {return res.status(200).json(deviceData)})
    .catch(err => {
        console.log(err);
        res.status(500).send("Napaka pri ustvarjanju deviceData");
      });
  },

  createAdmin: function (req, res) {
    const hiveId = req.body.hiveId;
    const weight = req.body.weight;
    const time = req.body.time;

    const deviceData = new deviceDataModel(null, weight, time, hiveId);
    deviceData
      .insert()
      .then((deviceData) => {
        return res.status(200).json(deviceData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Napaka pri ustvarjanju deviceData");
      });
  },

  listByUser: function (req, res) {
    const userId = req.auth.data.id;
    deviceDataModel.getAllByUserId(userId)
      .then((deviceData) => {
        return res.status(200).json(deviceData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Napaka pri list deviceData");
      });
  },
  list: function (req, res) {
    const userId = req.auth.data.id;
    deviceDataModel.getAll()
      .then((deviceData) => {
        return res.status(200).json(deviceData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Napaka pri list deviceData");
      });
  },
  show: function (req, res) {
    const userId = req.auth.data.id;
    const deviceDataId = req.params.id;
    deviceDataModel.getById(userId, deviceDataId)
      .then((deviceData) => {
        return res.status(200).json(deviceData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("Napaka pri show deviceData");
      });
  },

  update: function (req, res) {
     const id_user = req.auth.data.id;
    const time = req.body.time;
    const humidity = req.body.humidity ?? null;
    const brightness = req.body.brightness ?? null;
    const temperature = req.body.temperature;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;
    const deviceData = new deviceDataModel(null,humidity, brightness, temperature, longitude, latitude , time, id_user);
    deviceData
      .update()
      .then((deviceData) => {
        return res.status(200).json(deviceData);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send("Napaka pri posodabljanju deviceData");
      });
  },

  remove: function (req, res) {
    const deviceDataId = req.params.id ?? req.body.id;
    deviceDataModel.deleteById(deviceDataId)
      .then(() => {
        return res.status(200).send("Uspesno zbrisan deviceData");
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).send("Napaka pri brisanju deviceData");
      });
  },

  listByDate:function(req,res){
    const time_weight = req.body.time_weight;
    deviceDataModel.getAllByDate(time_weight)
    .then(deviceData=>{
      return res.status(200).json(deviceData);
    })
    .catch(err => {
        console.error(err);
        return res.status(500).send("Napaka pri listByDate");
      });
  }
}
export default deviceDataController;
