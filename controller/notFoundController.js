export class NotFoundController {
    showNotFound(req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.send(404, `Page "${req._parsedUrl.href}" not found!`);
    };
}

export const notFoundController = new NotFoundController();