export class IndexController {
    showIndex(req, res) {
        res.sendFile("/html/index.html",  {root: __dirname + '/public/'});
    };
}

export const indexController = new IndexController();