
import express from 'express';
import UserController from '../controller/userController.js';
import UserModel from "../model/userModel.js";

const router = express.Router();
/* GET*/
//router.get('/users/list', UserController.list);
router.get('/users/getAll', UserController.list);
router.get('/users/:id', UserController.show);
/* POST*/
router.post('/users/update', UserController.update);
router.post('/users/remove', UserController.remove);
router.post('/users/login',UserController.login);
router.post('/users/register',UserController.register);
router.post('/users/fcm',UserController.registerFcmToken);

export default router;