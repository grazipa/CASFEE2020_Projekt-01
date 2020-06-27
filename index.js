import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {notFoundRoutes} from './routes/notFoundRoutes.js';
import {noteRoutes} from './routes/noteRoutes.js';
import io from 'socket.io';

const app = express();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));
app.use(bodyParser.json());
app.use('/notes', noteRoutes);
app.use(notFoundRoutes);
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.stack);
  });

const hostname = '127.0.0.1';
const port = 3001;

const server = app.listen(port, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const socket = io(server);
app.locals.socket = socket;