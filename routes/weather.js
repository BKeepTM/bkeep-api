
import express from 'express';
import WeatherController from '../controller/weatherController.js';

const router = express.Router();
/* GET*/
//router.get('/users/list', WeatherController.create);
router.get('/weather/:id', WeatherController.show);
router.get('/weather/getAll', WeatherController.list);
/* POST*/
router.post('/weather/update', WeatherController.update);
router.post('/weather/remove', WeatherController.remove);
router.post('/weather', WeatherController.create);


export default router;