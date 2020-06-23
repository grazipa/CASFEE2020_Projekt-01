import {noteStore} from '../services/noteStore.js';

export class NoteController {
    async getNotes(req, res) {
        res.json((await noteStore.getNotes() || []))
    };

    async newNote(req, res) {
        res.json(await noteStore.newNote(req.body.title, req.body.priority, req.body.dueDate, req.body.note, req.body.finished, req.body.dateFinished));
    };

    async deleteNote(req, res) {
        res.json(await noteStore.deleteNote(req.params.id));
    };

    async getNote(req, res) {
        res.json(await noteStore.getNote(req.params.id));
    };

    async editNote(req, res) {
        res.json(await noteStore.editNote(req.body.id, req.body.title, req.body.priority, req.body.dueDate, req.body.note, req.body.finished, req.body.dateFinished));
    };

    async finishNote(req, res) {
        res.json(await noteStore.finishNote(req.body.id, req.body.finished, req.body.dateFinished));
    };
}

export const noteController = new NoteController();