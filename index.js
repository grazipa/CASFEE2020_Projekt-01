import express from 'express';
import path from 'path';
import {notFoundRoutes} from './routes/notFoundRoutes.js';

const app = express();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));
app.use(notFoundRoutes);
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.stack);
  });

const hostname = '127.0.0.1';
const port = 3001;

app.listen(port, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});