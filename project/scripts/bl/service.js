'use strict';

import {getUUID, getUnixTimestamp} from '../utils.js';
import {Note} from './note-class.js';

export class Service {
    constructor(storage) {
        this.storage = storage;
        this.notes = [];
        this.loadData();
    }

    editNote(id, title, priority, dueDate, note, finished, dateFinished) {
        const n = this.notes.find(n => n.id == id);
        if (n) {
            // Shorten title if to long
            title = title.length > 30 ? title.substring(0, 30) : title;

            n.title = title;
            n.priority = priority;
            n.dueDate = dueDate;
            n.note = note;
            n.finished = finished;
            n.title = title;
            n.dateFinished = dateFinished;
        }

        this.save();
    }

    newNote(title, priority, dueDate, note, finished, dateFinished) {
        // Shorten title if to long
        title = title.length > 30 ? title.substring(0, 30) : title;

        const n = new Note(getUUID(), title, priority, dueDate, note, finished, dateFinished, getUnixTimestamp())
        this.notes.push(n);
        this.save();
    }

    removeNoteById(id) {
        this.notes = this.notes.filter(n => n.id != id);
        this.save();
    }

    getNoteById(id) {
        return this.notes.find(n => n.id == id);
    }

    loadData() {
        this.notes = this.storage.getAll().map(n => new Note(n.id, n.title, n.priority, n.dueDate, n.note, n.finished, n.dateFinished, n.dateCreated));
    }

    setNoteFinished(id, finished) {
        finished = [true, false].includes(finished) ? finished: false;

        const note = this.notes.find(n => n.id == id);
        if (note) {
            switch (finished) {
                case true:
                    note.finished = finished;
                    note.dateFinished = Date.now();
                    break;
                
                case false:
                    note.finished = finished;
                    note.dateFinished = null;
                    break;
            }
        }
        this.save();
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
            notes = notes.filter(n => (n.title.includes(searchText)) || (n.note.includes(searchText)));
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
                    let dateObject = new Date(note.dateCreated)
                    let title = 'Date created: ' + dateObject.toLocaleDateString();

                    if (title in notesDict) {
                        notesDict[title]['notes'].push(note);
                    } else {
                        notesDict[title] = {};
                        notesDict[title]['title'] = title;
                        notesDict[title]['value'] = note.dateCreated;
                        notesDict[title]['notes'] = [note];
                    }
                }
                break;
            
            case 'finished':
                for (let note of notes) {
                    let title = '';

                    if (note.finished) {
                        let dateObject = new Date(note.dateFinished)
                        title = 'Date finished: ' + dateObject.toLocaleDateString();
                    } else {
                        title = 'Date finished: -';
                    }

                    if (title in notesDict) {
                        notesDict[title]['notes'].push(note);
                    } else {
                        notesDict[title] = {};
                        notesDict[title]['title'] = title;
                        notesDict[title]['value'] = note.dateFinished;
                        notesDict[title]['notes'] = [note];
                    }
                }
                break;
            
            case 'due':
                for (let note of notes) {
                    let dateObject = new Date(note.dueDate)
                    let title = 'Due date: ' + dateObject.toLocaleDateString()

                    if (title in notesDict) {
                        notesDict[title]['notes'].push(note);
                    } else {
                        notesDict[title] = {};
                        notesDict[title]['title'] = title;
                        notesDict[title]['value'] = note.dueDate;
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