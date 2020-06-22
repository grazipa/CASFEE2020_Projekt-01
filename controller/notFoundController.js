export class NotFoundController {
    showNotFound(req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.status(404).send(`Page "${req._parsedUrl.href}" not found!`);
    };
}

export const notFoundController = new NotFoundController();