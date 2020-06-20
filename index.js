import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));

app.get('/', function (req, res) {
    res.sendFile("/html/index.html",  {root: __dirname + '/public/'});
});


const hostname = '127.0.0.1';
const port = 3001;

app.listen(port, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});