'use strict';

import {httpService} from '../bl/http-service.js'

export class Storage {
    async getNotes() {
        return await httpService.ajax('GET', '/notes', undefined);
    }

    async newNote(note) {
        return await httpService.ajax('POST', '/notes', note.toJSON());
    }

    async deleteNote(id) {
        return await httpService.ajax('DELETE', `/notes/${id}`, undefined);
    }

    async getNote(id) {
        return await httpService.ajax('GET', `/notes/${id}`, undefined);
    }

    async editNote(note) {
        return await httpService.ajax('PUT', `/notes/${note._id}`, note.toJSON());
    }
}