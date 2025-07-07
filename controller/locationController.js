import { authPlugins } from "mysql2";
import LocationModel from "../model/locationModel.js";

const LocationController = {

  create: async function(req,res){
    const locationId = req.body.id; 
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;

    const location = new LocationModel(null,longitude,latitude);
    location.insert()
    .then(location => {return res.status(200).json(location)})
    .catch(err => {
        console.log(err);
        res.status(500).send("Napaka pri ustvarjanju lokacije");
    });
  },

  listByHives:function(req,res){
    const userId = req.auth.data.id;
    LocationModel.getAllWithHives(userId)
    .then(location=>{
      return res.status(200).json(location);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Napaka pri list location");
    });
  },

  list:function(req,res){
    LocationModel.getAll()
    .then(location=>{
      return res.status(200).json(location);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Napaka pri list location");
    });
  },

  show:function(req,res){
    const locationId = req.params.id;
    LocationModel.getById(locationId)
    .then(location => {
      return res.status(200).json(location);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Napaka pri show location");
    });
  },

  update: function(req, res) {
    const locationId = req.params.id || req.body.id;
    const longitude = req.body.longitude ?? null;
    const latitude = req.body.latitude ?? null;

    const location = new LocationModel(locationId, longitude, latitude);
    location.update()
        .then(result => {
            return res.status(200).json({
                message: "Location updated",
                result: result
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send("Napaka pri posodabljanju location");
        });
},

  remove:function(req,res){
    const locationId = req.params.id ?? req.body.id;
    LocationModel.deleteById(locationId)
    .then(()=> {return res.status(200).send("Uspesno zbrisan location")})
    .catch(err => {
        console.error(err);
        return res.status(500).send("Napaka pri brisanju location");
      });
  }

}

export default LocationController;