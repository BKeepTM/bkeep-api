import express from 'express';
import NotesController from '../controller/notesController.js';

const router = express.Router();

/* GET */
router.get('/notes/list', NotesController.listByUser);
router.get('/notes/getAll', NotesController.list);
router.get('/notes/:id', NotesController.show);
/* POST*/
router.post('/notes', NotesController.create);
router.post('/notes/admin', NotesController.createAdmin);
router.post('/notes/update', NotesController.update);
router.post('/notes/remove', NotesController.remove);
router.post('/notes/remove/admin', NotesController.removeAdmin);


export default router;