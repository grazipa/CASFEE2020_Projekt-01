import express from 'express';
import {noteController} from '../controller/noteController.js';

const router = express.Router();
router.get('/', noteController.getNotes);
router.post('/', noteController.newNote);
router.delete('/:id/', noteController.deleteNote);

export const noteRoutes = router;