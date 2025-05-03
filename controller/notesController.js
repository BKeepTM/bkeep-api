import NotesModel from "../model/notesModel.js";

const NotesController = {

  create:function(req,res){
    const notesId = req.body.id; //TODO <---niamo se jwt
    const content = req.body.content;
    const time = req.body.time;

    const notes = new NotesModel(null,content,time);
    notes.insert()
    .then(notes => {return res.status(200).json(notes)})
    .catch(err => {
        console.log(err);
        res.status(500).send("Napaka pri ustvarjanju notes");
    });
  },

  list:function(req,res){
    NotesModel.getAll()
    .then(notes=>{
      return res.status(200).json(notes);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Napaka pri list notes");
    });
  },

  show:function(req,res){
    const notesId = req.params.id;
    NotesModel.getById(notesId)
    .then(notes => {
      return res.status(200).json(notes);
    })
    .catch(err => {
        console.log(err);
        res.status(500).send("Napaka pri show notes");
    });
  },

  update: function(req,res){
    const notesId = req.params.id || req.body.id;
    const content = req.body.content ?? null;
    const time = req.body.time ?? null;

    const notes = new NotesModel(notesId,content,time);
    notes.update()
    .then(notes => {return res.status(200).json(notes)})
    .catch(err => {
      console.error(err);
      return res.status(500).send("Napaka pri posodabljanju notes");
    });
  },

  remove:function(req,res){
    const notesId = req.params.id ?? req.body.id;
    NotesModel.deleteById(notesId)
    .then(()=> {return res.status(200).send("Uspesno zbrisan notes")})
    .catch(err => {
        console.error(err);
        return res.status(500).send("Napaka pri brisanju notes");
      });
  }

}

export default NotesController;