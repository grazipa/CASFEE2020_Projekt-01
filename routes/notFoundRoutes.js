import express from 'express';
import {notFoundController} from '../controller/notFoundController.js';

const router = express.Router();
router.all('/*', notFoundController.showNotFound);

export const notFoundRoutes = router;