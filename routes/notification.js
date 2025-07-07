import express from 'express';
import NotificationController from '../controller/notificationController.js';

const router = express.Router();

/* GET */
router.get('/notification/list', NotificationController.listByUser);
router.get('/notification/getAll', NotificationController.list);
router.get('/notification/getByHref',NotificationController.getByHref)
router.get('/notification/:id', NotificationController.show);

/* POST*/
router.post('/notification', NotificationController.create);
router.post('/notification/update', NotificationController.update);
router.post('/notification/remove', NotificationController.remove);


export default router;