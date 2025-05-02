import express from 'express';
import userController from '../controller/userController'
import express from 'express';

const router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  res.send(userController.login(req,res,next));
});

export default router;