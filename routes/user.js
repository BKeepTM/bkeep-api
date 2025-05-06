import express from 'express';
import userController from '../controller/userController.js'

const router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  res.send(userController.login(req,res,next));
});
router.post('/register', function(req, res, next) {
  res.send(userController.register(req,res,next));
});

export default router;