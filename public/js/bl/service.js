'use strict';

import {getUnixTimestamp} from '../helpers.js';
import {Note} from './note-class.js';

export class Service {
    constructor(storage) {
        this.storage = storage;
    }

    async editNote(id, title, priority, dueDate, note, finished, dateFinished) {
        const note = await this.storage.getNote(id);
        if (note) {
            // Shorten title if to long
            title = title.length > 30 ? title.substring(0, 30) : title;

            note.title = title;
            note.priority = priority;
            note.dueDate = dueDate;
            note.note = note;
            note.finished = finished;
            note.title = title;
            note.dateFinished = dateFinished;
        }
    }

    async newNote(title, priority, dueDate, note, finished, dateFinished) {
        title = title.length > 30 ? title.substring(0, 30) : title;
        const note = new Note(null, title, priority, dueDate, note, finished, dateFinished, getUnixTimestamp())
        await this.storage.newNote(note);
    }

    async removeNoteById(id) {
        await this.storage.deleteNote(id);
    }

    async getNoteById(id) {
        const note = await this.storage.getNote(id);
        return new Note(note._id, note.title, note.priority, note.dueDate, note.note, note.finished, note.dateFinished, note.dateCreated);
    }

    setNoteFinished(id, finished) {
        const note = await this.storage.getNote(id);
        finished = [true, false].includes(finished) ? finished: false;

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
    }

    async getNotesFilteredBy(filterBy) {
        let notes = (await this.storage.getNotes()).map(n => new Note(n._id, n.title, n.priority, n.dueDate, n.note, n.finished, n.dateFinished, n.dateCreated));
        filterBy = ['open', 'finished', 'all'].includes(filterBy) ? filterBy: 'open';

        switch (filterBy) {
            case 'open':
                return notes.filter(n => n.finished === false);
            
            case 'finished':
                return notes.filter(n => n.finished === true);

            case 'all':
                return notes;
        }
    }

    async getNotes(searchText, sortBy, filterBy) {    
        let notes = await this.getNotesFilteredBy(filterBy);
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