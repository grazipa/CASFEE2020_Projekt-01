import {Note} from './note-class.js';

export class Service {
    constructor(storage) {
        this.storage = storage;
        this.notes = [];
        this.loadData();
    }

    loadData() {
        this.notes = this.storage.getAll().map(n => new Note(n.id, n.title, n.priority, n.dueDate, n.note, n.finished, n.dateFinished, n.dateCreated));
    }

    save() {
        this.storage.update(this.notes.map(n => n.toJSON()));
    }

    getNotesFilteredBy(filterBy) {
        filterBy = ['open', 'finished', 'all'].includes(filterBy) ? filterBy: 'open';

        switch (filterBy) {
            case 'open':
                return this.notes.filter(n => n.finished === false);
            
            case 'finished':
                return this.notes.filter(n => n.finished === true);

            case 'all':
                return this.notes;
        }
    }

    getNotes(searchText, sortBy, filterBy) {    
        let notes = this.getNotesFilteredBy(filterBy);
        if (searchText !== '') {
            notes = notes.filter(n => (note.title.includes(searchText)) || (note.note.includes(searchText)));
        }

        sortBy = ['priority', 'created', 'finished', 'due'].includes(sortBy) ? sortBy: 'priority';

        const notesDict = {};
        switch (sortBy) {
            case 'priority':
                for (let note of notes) {
                    let title = 'Priority: ' + note.priority;

                    if (title in notesDict) {
                        notesDict[title]['notes'].push(note);
                    } else {
                        notesDict[title] = {};
                        notesDict[title]['title'] = title;
                        notesDict[title]['value'] = note.priority;
                        notesDict[title]['notes'] = [note];
                    }
                }
                break;

            case 'created':
                for (let note of notes) {
                    let dateObject = new Date(note.datecreated)
                    let title = 'Date created: ' + dateObject.toLocaleDateString();

                    if (title in notesDict) {
                        notesDict[title]['notes'].push(note);
                    } else {
                        notesDict[title] = {};
                        notesDict[title]['title'] = title;
                        notesDict[title]['value'] = note.datecreated;
                        notesDict[title]['notes'] = [note];
                    }
                }
                break;
            
            case 'finished':
                for (let note of notes) {
                    let title = '';

                    if (note.finished) {
                        let dateObject = new Date(note.datefinished)
                        title = 'Date finished: ' + dateObject.toLocaleDateString();
                    } else {
                        title = 'Date finished: -';
                    }

                    if (title in notesDict) {
                        notesDict[title]['notes'].push(note);
                    } else {
                        notesDict[title] = {};
                        notesDict[title]['title'] = title;
                        notesDict[title]['value'] = note.datefinished;
                        notesDict[title]['notes'] = [note];
                    }
                }
                break;
            
            case 'due':
                for (let note of notes) {
                    let dateObject = new Date(note.duedate)
                    let title = 'Due date: ' + dateObject.toLocaleDateString()

                    if (title in notesDict) {
                        notesDict[title]['notes'].push(note);
                    } else {
                        notesDict[title] = {};
                        notesDict[title]['title'] = title;
                        notesDict[title]['value'] = note.duedate;
                        notesDict[title]['notes'] = [note];
                    }
                }
                break;
        }

        const notesArray = [];
        for (let key in notesDict) {
            notesArray.push(notesDict[key])
        }

        notesArray.sort(function(a, b) {
            return a['value'] - b['value'];
        });

        return notesArray;
    }
}