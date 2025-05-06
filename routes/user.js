import express from 'express';
import userController from '../controller/userController.js'

const router = express.Router();

/* GET users listing. */
router.post('/login', userController.login)
;
router.post('/register', userController.register);

export default router;