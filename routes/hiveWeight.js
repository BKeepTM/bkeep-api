import express from 'express';
import HiveWeightController from '../controller/hiveWeightController.js';

const router = express.Router();

/* GET */
router.get('/hiveWeight/list', HiveWeightController.list);
router.get('/hiveWeight/:id', HiveWeightController.show);

/* POST */
router.post('/hiveWeight', HiveWeightController.create);
router.post('/hiveWeight/update', HiveWeightController.update);
router.post('/hiveWeight/remove', HiveWeightController.remove);


export default router;