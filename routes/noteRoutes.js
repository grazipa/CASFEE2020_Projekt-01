import express from 'express';
import {noteController} from '../controller/noteController.js';

const router = express.Router();
router.get('/', noteController.getNotes);
router.post('/', noteController.newNote);
router.delete('/:id/', noteController.deleteNote);
router.get('/:id/', noteController.getNote);
router.put('/:id/', noteController.editNote);
router.patch('/:id/', noteController.finishNote);

export const noteRoutes = router;