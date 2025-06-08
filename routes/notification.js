import express from 'express';
import NotificationController from '../controller/notificationController.js';

const router = express.Router();

/* GET */
router.get('/notification/list', NotificationController.listByUser);
router.get('/notification/:id', NotificationController.show);
router.get('/notification/getAll', NotificationController.list);
/* POST*/
router.post('/notification', NotificationController.create);
router.post('/notification/update', NotificationController.update);
router.post('/notification/remove', NotificationController.remove);


export default router;