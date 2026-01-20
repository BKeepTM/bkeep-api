import HiveModel from "../model/hiveModel.js";
import LocationModel from "../model/locationModel.js";

const HiveController = {

create: async function (req, res) {
  try {
    const { name, type, status, longitude, latitude, location } = req.body;
    const userId = req.auth.data.id;

    console.log("name",name)
    console.log("type",type)
    console.log("long",longitude)
    console.log("lat",latitude)
    console.log("location",location)
    console.log("user",userId)

    const locationObj = new LocationModel(null, longitude, latitude);
    const insertedLocation = await locationObj.insert(); 

    console.log("location id:", insertedLocation)

    const hive = new HiveModel(
      null,
      name,
      location,          
      type,
      status,
      insertedLocation.id, 
      userId
    );

    const insertedHive = await hive.insert();
    return res.status(200).json(insertedHive);

  } catch (err) {
    console.log(err);
    res.status(500).send("Napaka pri ustvarjanju panja");
  }
},


createAdmin: async function (req, res) {
  try {
    const { name, type, status, longitude, latitude, location, userId } = req.body;

    console.log("name",name)
    console.log("type",type)
    console.log("status",status)
    console.log("long",longitude)
    console.log("lat",latitude)
    console.log("location",location)
    console.log("user",userId)

    const locationObj = new LocationModel(null, longitude, latitude);
    const insertedLocation = await locationObj.insert(); 

    console.log("location id:", insertedLocation)

    const hive = new HiveModel(
      null,
      name,
      location,          
      type,
      status,
      insertedLocation.id, 
      userId
    );

    const insertedHive = await hive.insert();
    return res.status(200).json(insertedHive);

  } catch (err) {
    console.log(err);
    res.status(500).send("Napaka pri ustvarjanju panja");
  }
},


  listByUser:function(req,res){
    const userId = req.auth.data.id
    HiveModel.getAllByUserId(userId)
    .then(hive=>{
      return res.status(200).json(hive);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Napaka pri list hajva");
  });
  },
  list:function(req,res){
    const userId = req.auth.data.id
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
    const userId = req.auth.data.id
    HiveModel.getById(hiveId,userId)
    .then(hive => {
      return res.status(200).json(hive);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("Napaka pri show hive");
  });
  },
  updateStatus: function(req,res){
    const hiveId = req.params.id || req.body.id;
    const status = req.body.status;
    const userId = req.auth.data.id;

    const hive = new HiveModel(hiveId,null,null,null,status,null,userId);
    hive.updateStatus()
    .then(hive => {return res.status(200).json(hive)})
    .catch(err => {
      console.error(err);
      return res.status(500).send("Napaka pri posodabljanju statusa hive");
    });
  },
  update: function(req,res){
    const hiveId = req.params.id || req.body.id;
    const name = req.body.name ?? null;
    const location = req.body.location ?? null;
    const type = req.body.type ?? null;
    const status = req.body.status ?? null;
    const id_location = req.body.id_location ?? null;
    const id_user = req.auth.data.id ?? null;

    const hive = new HiveModel(hiveId,name,location,type,status,id_location,id_user);
    hive.update()
    .then(hive => {return res.status(200).json(hive)})
    .catch(err => {
      console.error(err);
      return res.status(500).send("Napaka pri posodabljanju hive");
    });
  },

  remove:function(req,res){
    const hiveId = req.params.id ?? req.body.id ?? req.query.id;  
    const userId = req.auth.data.id

    console.log("hiveid", hiveId)
    console.log("userId", userId)

    HiveModel.deleteById(hiveId, userId)
    .then(()=> {return res.status(200).send("Uspesno zbrisan panj")})
    .catch(err => {
      console.error(err);
      return res.status(500).send("Napaka pri brisanju hive");
    });
  },

  removeAdmin:function(req,res){
    const hiveId = req.params.id ?? req.body.id;  
    const userId = req.auth.data.id

    console.log("hiveid", hiveId)
    console.log("userId", userId)

    HiveModel.deleteByIdAdmin(hiveId)
    .then(()=> {return res.status(200).send("Uspesno zbrisan panj")})
    .catch(err => {
      console.error(err);
      return res.status(500).send("Napaka pri brisanju hive");
    });
  },

  search:function(req,res){
    const name = req.body.name;
    const userId = req.auth.data.id;

    console.log(name)
    console.log(userId)


    HiveModel.search(name,userId)
    .then((hives)=> {return res.status(200).json(hives)})
    .catch(err =>{
      console.log(err);
      return res.status(500).send("Napaka pri iskanju panjev");
    })
  },
  getByLoaction:function(req,res){
    const x1 = req.body.x1;
    const y1 = req.body.y1;
    const x2 = req.body.x2;
    const y2 = req.body.x2;
  }
}

export default HiveController;