import HiveWeightModel from "../model/hiveWeightModel.js";
import EspSecretModel from "../model/espSecretModel.js";

const processWeightData = async (data) => { // helper... od ai
    const hiveId = data.hiveId;
    const weight = data.weight;
    let timeWeight = data.timeWeight; 
    if (!timeWeight) {
        timeWeight = new Date(); 
    }
    const hiveWeight = new HiveWeightModel(null, weight, timeWeight, hiveId);
    
    return hiveWeight.insert();
};

const HiveWeightController = {

  create:function(req,res){
    const hiveId = req.body.hiveId;
    const weight = req.body.weight;
    const timeWeight = req.body.timeWeight; //todo api kljue za tezo
    // const apiKey = req.body.key;
    // if (weight === null  || apiKey == undefined){ // uporabnik ni poslal username/password
    //      return res.status(400).json({error:'weight or api key missing'})
    // }
    //  if (timeWeight == null)
    //     timeWeight = Date.now();
    const hiveWeight = new HiveWeightModel(null,weight,timeWeight,hiveId);
    hiveWeight.insert()
    .then(hiveWeight => {return res.status(200).json(hiveWeight)})
    .catch(err => {
        console.log(err);
        res.status(500).send("Napaka pri ustvarjanju hiveWeight");
      });
  },
   // This is called by your server.js when a message arrives
   handleMqttMessage: async function(topic, messageBuffer) {
    try {
      // Convert buffer to string
      const messageString = messageBuffer.toString();
      console.log(`MQTT Received [${topic}]:`, messageString);
      
      // Parse JSON from device
      const data = JSON.parse(messageString);

      // REUSE the same logic as HTTP
      const result = await processWeightData(data);
      
      console.log("MQTT Data saved successfully via HiveWeightController");
    } catch (err) {
      // We cannot send an HTTP 'res' back to MQTT, so we log the error
      console.error("MQTT Processing Error:", err.message);
    }
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

  listByDate:function(req,res){
    const time_weight = req.body.time_weight;
    HiveWeightModel.getAllByDate(time_weight)
    .then(hiveWeight=>{
      return res.status(200).json(hiveWeight);
    })
    .catch(err => {
        console.error(err);
        return res.status(500).send("Napaka pri listByDate");
      });
  }
}
export default HiveWeightController;
