import Datastore from 'nedb-promise';

export class NoteStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async all() {
        return 'TEST';
    }
}

export const noteStore = new NoteStore();