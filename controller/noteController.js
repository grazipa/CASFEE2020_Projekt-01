import {noteStore} from '../services/noteStore.js';

export class NoteController {
    async getNotes(req, res) {
        res.json((await noteStore.all() || []))
    };

    async newNote(req, res) {
        res.json(await noteStore.newNote(req.body.title, req.body.priority, req.body.dueDate, req.body.note, req.body.finished, req.body.dateFinished));
    };
}

export const noteController = new NoteController();