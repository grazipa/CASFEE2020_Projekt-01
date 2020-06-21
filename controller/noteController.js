import {noteStore} from '../services/noteStore.js';

export class NoteController {
    async getNotes(req, res) {
        res.json((await noteStore.all() || []))
    };
}

export const noteController = new NoteController();