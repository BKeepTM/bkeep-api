import express from 'express';
import HiveController from '../controller/hiveController.js';

const router = express.Router();

/* GET */
router.get('/hive/list', HiveController.listByUser);
router.get('/hive/search', HiveController.search)
router.get('/hive/getAll', HiveController.list);
router.get('/hive/:id', HiveController.show);

/* POST */
router.post('/hive', HiveController.create);
router.post('/hive/admin', HiveController.createAdmin);
router.post('/hive/update', HiveController.update);
router.post('/hive/remove', HiveController.remove);
router.post('/hive/remove/admin', HiveController.removeAdmin);

router.put('/hive/:id', HiveController.update);


export default router;