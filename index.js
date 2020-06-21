import express from 'express';
import path from 'path';

import {indexRoutes} from './routes/indexRoutes.js';

const app = express();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));
app.use('/', indexRoutes);

const hostname = '127.0.0.1';
const port = 3001;

app.listen(port, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});