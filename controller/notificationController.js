import NotificationModel from "../model/notificationModel.js";
   //  this.id = id;
    //     this.summary = summary;
    //     this.description = description;
    //     this.href = href;
    //     this.user_id = user_id;
const NotificationController = {
  async create(req, res) {
    const userId = req.auth.data.id;
    const { summary, description, href } = req.body;
   

    console.log("User", userId);
    console.log("summary", summary);
    console.log("description", description);
    console.log("href", href);

    try {
      const isAllowed = await NotificationModel.notificationBelongsToUser(notificationId, userId);
      if (!isAllowed) return res.status(403).send("Dostop do panja zavrnjen.");
      const note = new NotificationModel(null, content, time, hiveId);
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
      const notes = await NotificationModel.getAllByUserId(userId);
      return res.status(200).json(notes);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri pridobivanju notification.");
    }
  },
  
   async list(req, res) {
    const userId = req.auth.data.id;

    try {
      const notes = await NotificationModel.getAll();
      return res.status(200).json(notes);
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri pridobivanju notifications.");
    }
  },

  async show(req, res) {
    const hiveId = req.params.id;
    const userId = req.auth.data.id;

    try {
      const note = await NotificationModel.getByIdForUser(hiveId, userId);
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
      const existingNote = await NotificationModel.getByIdForUser(noteId, userId);
      if (!existingNote) return res.status(403).send("Dostop zavrnjen ali notes ne obstaja.");

      const hiveToUse = id_hive ?? existingNote.id_hive;
      const isAllowed = await NotificationModel.hiveBelongsToUser(hiveToUse, userId);
      if (!isAllowed) return res.status(403).send("Nimaš dostopa do novega panja.");

      const note = new NotificationModel(noteId, content ?? existingNote.content, time ?? existingNote.time, hiveToUse);
      await note.update();
      return res.status(200).json({ message: "Uspešno posodobljeno." });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri posodobitvi notes.");
    }
  },

  async remove(req, res) {
    const userId = req.auth.data.id;
    const noteId =  req.body.id;

    console.log("UserId", userId);
    console.log("notesId",noteId);

    try {
      const [result] = await NotificationModel.deleteByIdForUser(noteId, userId);
      if (result.affectedRows === 0) return res.status(403).send("Ni dostopa ali notes ne obstaja.");
      return res.status(200).send("Uspešno zbrisano.");
    } catch (err) {
      console.error(err);
      return res.status(500).send("Napaka pri brisanju notes.");
    }
  }
};

export default NotesController;
