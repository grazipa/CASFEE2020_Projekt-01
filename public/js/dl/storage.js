'use strict';

import { httpService } from '../bl/http-service.js'

export class Storage {
    async getNotes() {
        return await httpService.ajax('GET', '/notes', undefined);
    }

    async newNote(note) {
        return await httpService.ajax('POST', '/notes', note.toJSON());
    }
}