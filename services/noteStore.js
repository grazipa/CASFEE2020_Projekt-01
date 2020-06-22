import Datastore from 'nedb-promise';

export class Note {
    constructor(title, priority, dueDate, note, finished, dateFinished, dateCreated) {
        this.title = title;
        this.priority = priority;
        this.dueDate = dueDate;
        this.note = note;
        this.finished = finished;
        this.dateFinished = dateFinished;
        this.dateCreated = dateCreated;
    }
}

export class NoteStore {
    constructor() {
        this.db = new Datastore({filename: './data/notes.db', autoload: true});
    }

    async all() {
        return await this.db.cfind({}).exec();
    }

    async newNote(title, priority, dueDate, note, finished, dateFinished) {
        const n = new Note(title, priority, dueDate, note, finished, dateFinished);
        return await this.db.insert(n);
    }

    async deleteNote(id) {
        return await this.db.remove({ _id: id });
    }
}

export const noteStore = new NoteStore();