import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mysql from 'mysql2';
import mqtt from 'mqtt';
import { initMqtt } from './util/mqttHandler.js'; 

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import hiveRouter from './routes/hive.js';
import locationRouter from './routes/location.js';
import notesRouter from './routes/notes.js';
import hiveWeightRouter from './routes/hiveWeight.js';
import notificationRouter from './routes/notification.js';
import whetherRouter from './routes/weather.js';
import blockchainRouter from './routes/blockchain.js';
import deviceDataRouter from './routes/deviceData.js'
import analysisRouter from './routes/analysis.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {expressjwt} from "express-jwt";
import cors from "cors";
import { appendFileSync } from 'fs';
import { utils } from 'mocha';



var app = express();

app.use(cors({
  origin: '*',
  credentials: true,               
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// rabis jwt token kjerkoli razen za login
app.use(
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: [process.env.JWT_ALGORITHM],
  }).unless({ path: ["/users/login", "/users/register", "/hiveWeight", "/notes", "/public"] })
)

app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', hiveRouter);
app.use('/', locationRouter);
app.use('/', notesRouter);
app.use('/', hiveWeightRouter);
app.use('/', notificationRouter)
app.use('/', whetherRouter)
app.use('/', blockchainRouter)
app.use('/', deviceDataRouter)
app.use('/',analysisRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//mqtt
initMqtt();


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("Server started on port ",process.env.PORT || 3000);
export default app;