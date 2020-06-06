import {Note} from './note-class.js';

export class Service {
    constructor(storage) {
        this.storage = storage;
        this.notes = [];
    }

    loadData() {
        this.notes = this.storage.getAll().map(n => new Note(n.title, n.priority, n.dueDate, n.note, n.finished, n.dateFinished, n.dateCreated));
    }

    save() {
        this.storage.update(this.notes.map(n => n.toJSON()));
    }
}