import express, { json } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import cors from 'cors';

import indexRoute from './routes/index.route';
import authRoute from './routes/auth.route';
import eventRoute from './routes/events.route';

import './database/config';

//initializations
const app = express();
dotenv.config();

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); //directorio publico

//settings
app.set('PORT', process.env.PORT || 3002);

//routes
app.use('/', indexRoute);
app.use('/api/auth', authRoute);
app.use('/api/event', eventRoute);

export default app;