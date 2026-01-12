import express from 'express';
import HiveWeightController from '../controller/hiveWeightController.js';

const router = express.Router();

/* GET */
router.get('/hiveWeight/list', HiveWeightController.listByUser);
router.get('/hiveWeight/getAll', HiveWeightController.list);
router.get('/hiveWeight/:id', HiveWeightController.show);
router.post('/hiveWeight/getAllByDate', HiveWeightController.listByDate);
/* POST */
router.post('/hiveWeight', HiveWeightController.create);
router.post('/hiveWeight/admin', HiveWeightController.createAdmin);
router.post('/hiveWeight/update', HiveWeightController.update);
router.post('/hiveWeight/remove', HiveWeightController.remove);


export default router;