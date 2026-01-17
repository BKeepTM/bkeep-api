import { use } from "react";
import EspSecretModel from "../model/espSecretModel.js";
import HiveModel from "../model/hiveModel.js";
import { randomBytes } from "crypto";
/*
  export default class EspSecretModel {
    constructor(id, secret, id_hive, date_registered) {
        this.id = id;
        this.secret = secret;
        this.id_hive = id_hive;
        this.date_registered = date_registered;
    } 
*/
const EspSecretController = {
  async create(req, res) {
    // naredi esp secret in ga vrne.
    const { id_hive } = req.body;
    const userId = req.auth.data.id;
    console.log("Id_hive ", id_hive);
    try {
      const hive = await HiveModel.getByIdForUser(id_hive, userId);
      if (!hive.length) {
        return res.status(403).send("panj ne obstaja");
      }
    } catch (error) {
      console.error(err);
      return res.status(500).send("Napaka pri registriranju ESP.");
    }
    try {
      const secret = randomBytes(32).toString("hex"); // ustvari secret...
      console.log("Secret ", secret);
      //TODO preveri ce hive dejankso obstaja.
      const secretEsp = new EspSecretModel(null, secret, id_hive, null);
      const [result] = await secretEsp.insert();

      return res.status(201).json({ secret: secret });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri registriranju ESP.");
    }
  },

  async listByUser(req, res) {
    const userId = req.auth.data.id;
    try {
      const secretEspList = await EspSecretModel.getAllByUserId(userId);
      return res.status(200).json(secretEspList);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri pridobivanju ESP list.");
    }
  },

  async listAdmin(req, res) { // admin metoda
    const userId = req.auth.data.id;
    try {
      const secretEspList = await EspSecretModel.getAll();
      return res.status(200).json(secretEspList);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri pridobivanju ESP seznama.");
    }
  },


  
  async remove(req, res) {
    const userId = req.auth.data.id;
    const secretId = req.body.id;

    console.log("UserId", userId);
    console.log("hiveId", hiveId);

    try {
      const [result] = await EspSecretModel.deleteByIdForUser(
        secretId,
        userId
      );
      if (result.affectedRows === 0)
        return res.status(403).send("Ni dostopa ali notes ne obstaja.");
      return res.status(200).send("Uspešno zbrisano.");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri brisanju espSecret.");
    }
  },
};

export default EspSecretController;
