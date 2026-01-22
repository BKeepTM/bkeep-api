import express from 'express';
import deviceDataController from '../controller/deviceDataController.js';

const router = express.Router();

/* GET */
router.get('/deviceData/list', deviceDataController.listByUser);
router.get('/deviceData/getAll', deviceDataController.list);
router.get('/deviceData/:id', deviceDataController.show);
router.post('/deviceData/getAllByDate', deviceDataController.listByDate);
router.post('/deviceData/getAllByLocation', deviceDataController.listByDate);
/* POST */
router.post('/deviceData', deviceDataController.create);
router.post('/deviceData/update', deviceDataController.update);
router.post('/deviceData/remove', deviceDataController.remove);


export default router;