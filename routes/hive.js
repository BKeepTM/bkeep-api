import express from 'express';
import hiveController from '../controller/hiveController.js';

const router = express.Router();

/* GET hive. */
router.get('/hive', hiveController.getHive);

export default router;