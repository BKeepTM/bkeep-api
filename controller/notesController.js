import NotesModel from "../model/notesModel.js";
import HiveModel from "../model/hiveModel.js";
import DeviceTokenModel from "../model/deviceTokenModel.js";
import messaging from "../firebaseConfig.js";
const NotesController = {
 async create(req, res) {
    const { content, time } = req.body;
    const hiveId = req.body.hiveId;
    
    // 1. Determine the Actor (User or Device?)
    let actorId = null;
    if (req.auth && req.auth.data) {
        actorId = req.auth.data.id;
    }

    console.log("Request from Actor ID:", actorId || "IoT Device");
    console.log("Content:", content);
    console.log("Hive ID:", hiveId);

    try {
      const note = new NotesModel(null, content, time, hiveId);
      const [result] = await note.insert();

      let recipientUserId = actorId;

      if (!recipientUserId) {
       const hive = await HiveModel.getByIdNoUser(hiveId)
        if (hive != null) {
            recipientUserId = hive[0].id_user;
            console.log(hive);
        } else {
            console.log(`Hive ${hiveId} not found, cannot send notification.`);
        }
      }

      if (recipientUserId) {
          const tokens = await DeviceTokenModel.getTokensByUserId(recipientUserId);
          
          if (tokens && tokens.length > 0) {
            console.log(`Sending notification to ${tokens.length} devices for User ${recipientUserId}`);

            const message = {
                notification: {
                    title: 'Hive message', 
                    body: `${content}\nTime: ${time}`
                },
                data: {
                    hive_id: hiveId.toString(),
                    event_type: "extreme_weight_loss"
                },
                tokens: tokens 
            };

            const response = await messaging.sendEachForMulticast(message);
            console.log('FCM Response:', response.successCount + ' messages sent successfully');

            if (response.failureCount > 0) {
                const failedTokens = [];
                response.responses.forEach((resp, idx) => {
                    if (!resp.success) {
                        failedTokens.push(tokens[idx]);
                    }
                });
                await DeviceTokenModel.deleteTokens(failedTokens);
                console.log("Cleaned up dead tokens:", failedTokens);
            }
          } else {
              console.log("No devices registered for this user.");
          }
      }
      return res.status(201).json({ id: result.insertId });

    } catch (err) {
      console.error("Error in create note:", err);
      return res.status(500).send("Napaka pri ustvarjanju notes.");
    }
  },

  async createAdmin(req, res) {
    const userId = req.auth.data.id;
    const { content, time } = req.body;
    const hiveId = req.body.hiveId;

    console.log("User", userId);
    console.log("content", content);
    console.log("time", time);
    console.log("hiveId", hiveId);

    try {
      const note = new NotesModel(null, content, time, hiveId);
      const [result] = await note.insert();
      return res.status(201).json({ id: result.insertId });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri ustvarjanju notes.");
    }
  },

  async listByUser(req, res) {
    const userId = req.auth.data.id;
    try {
      const notes = await NotesModel.getAllByUserId(userId);
      return res.status(200).json(notes);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri pridobivanju notes.");
    }
  },
  
   async list(req, res) {
    const userId = req.auth.data.id;

    try {
      const notes = await NotesModel.getAll();
      return res.status(200).json(notes);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri pridobivanju notes.");
    }
  },

  async show(req, res) {
    const hiveId = req.params.id;
    const userId = req.auth.data.id;

    try {
      const note = await NotesModel.getByIdForUser(hiveId, userId);
      if (!note) return res.status(403).send("Dostop zavrnjen ali notes ne obstaja.");
      return res.status(200).json(note);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri prikazu notes.");
    }
  },

  async update(req, res) {
    const userId = req.auth.data.id;
    const noteId = req.params.id || req.body.id;
    const { content, time, id_hive } = req.body;

    try {
      const existingNote = await NotesModel.getByIdForUser(noteId, userId);
      if (!existingNote) return res.status(403).send("Dostop zavrnjen ali notes ne obstaja.");

      const hiveToUse = id_hive ?? existingNote.id_hive;
      const isAllowed = await NotesModel.hiveBelongsToUser(hiveToUse, userId);
      if (!isAllowed) return res.status(403).send("Nimaš dostopa do novega panja.");

      const note = new NotesModel(noteId, content ?? existingNote.content, time ?? existingNote.time, hiveToUse);
      await note.update();
      return res.status(200).json({ message: "Uspešno posodobljeno." });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri posodobitvi notes.");
    }
  },

  async remove(req, res) {
    const userId = req.auth.data.id ; // TOKEN -> JWT
    //const hiveId = req.params.id ?? 
    const noteId = req.body.id ?? req.query.id; // 

    console.log("UserId", userId);
    console.log("notesId",noteId);

    try {
      const [result] = await NotesModel.deleteByIdForUser(noteId, userId);
      if (result.affectedRows === 0) return res.status(403).send("Ni dostopa ali notes ne obstaja.");
      return res.status(200).send("Uspešno zbrisano.");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri brisanju notes.");
    }
  },

  async removeAdmin(req, res) {
    const userId = req.auth.data.id;
    const noteId =  req.body.id;

    console.log("UserId", userId);
    console.log("notesId",noteId);

    try {
      const [result] = await NotesModel.deleteAdmin(noteId);
      if (result.affectedRows === 0) return res.status(403).send("Ni dostopa ali notes ne obstaja.");
      return res.status(200).send("Uspešno zbrisano.");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri brisanju notes.");
    }
  }
};

export default NotesController;
