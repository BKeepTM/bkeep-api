import express from 'express';
import LocationController from '../controller/locationController.js';

const router = express.Router();

/* GET */
router.get('/location/list', LocationController.listByHives);
router.get('/location/getAll', LocationController.list);
router.get('/location/:id', LocationController.show);

/* POST */
router.post('/location', LocationController.create);
router.post('/location/update', LocationController.update);
router.post('/location/remove', LocationController.remove);


export default router;