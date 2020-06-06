'use strict';

export class Storage {
    constructor() {
        this.storageName = 'notesStorage'
        this.notes = JSON.parse(localStorage.getItem(this.storageName) || '[]');
    }

    getAll() {
        return this.notes;
    }

    update(notes) {
        this.notes = notes;
        localStorage.setItem(this.storageName, JSON.stringify(notes));
    }
}