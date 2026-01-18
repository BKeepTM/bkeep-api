import NotesModel from "../model/notesModel.js";

const NotesController = {
  async create(req, res) {
    const userId = req.auth.data.id;
    const { content, time } = req.body;
    const hiveId = req.body.hiveId;

    console.log("User", userId);
    console.log("content", content);
    console.log("time", time);
    console.log("hiveId", hiveId);

    try {
      const isAllowed = await NotesModel.hiveBelongsToUser(hiveId, userId);
      if (!isAllowed) return res.status(403).send("Dostop do panja zavrnjen.");

      // Ce zgornja vrstica ni zakometirana potem generiram samo za enega uporabnika oziroma njegove panje

      const note = new NotesModel(null, content, time, hiveId);
      const [result] = await note.insert();
      return res.status(201).json({ id: result.insertId });
    } catch (err) {
      console.error(err);
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
      const notes = await NotesModel.getAllByUser(userId);
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
