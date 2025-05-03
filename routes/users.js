import express from 'express';
import UserController from '../controller/userController.js';

const router = express.Router();

/* GET*/
router.get('/users/list', UserController.list);
router.get('/users/:id', UserController.show);

/* POST*/
router.post('/users', UserController.create);
router.post('/users/update', UserController.update);
router.post('/users/remove', UserController.remove);


export default router;