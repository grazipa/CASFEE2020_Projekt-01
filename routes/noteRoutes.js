import express from 'express';
import {noteController} from '../controller/noteController.js';

const router = express.Router();
router.get('/', noteController.getNotes);

export const noteRoutes = router;