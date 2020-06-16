'use strict';

import {notesListTemplate} from './notes-list-template.js';
import {noteModalTemplate} from './note-modal-template.js';
import {convertDateToIso, getUnixTimestamp} from '../utils.js';

export class Controller {
    constructor(service) {
        this.service = service;

        this.notesListTemplateCompiled = Handlebars.compile(notesListTemplate);
        this.noteModalTemplateCompiled = Handlebars.compile(noteModalTemplate);

        this.notesListContainer = document.getElementById('notes-list-container');
        this.styleDropdown = document.getElementById('style-dropdown');
        this.stylesheet = document.getElementById('stylesheet');
        this.searchNote = document.getElementById('search-note');
        this.sortNote = document.getElementById('sort-note');
        this.filterNote = document.getElementById('filter-note');
        this.addNote = document.getElementById('add-note');
        
        // Modal
        this.modalNote = document.getElementById('modal-note');        
    }

    getPreferredStyle() {
        let preferredStyle = '';
        if (document.cookie) {
            preferredStyle = document.cookie.split('; ').find(row => row.startsWith('style')).split('=')[1];
        }

        return preferredStyle;
    }

    setPreferredStyle(style) {
        const date = new Date();
        date.setTime(date.getTime() + (30 * 86400 * 1000));
        document.cookie = `style=${style}; expires=${date.toUTCString()}`;
    }

    setStylesheet(style) {
        let href = '';
        let selectedIndex = null;

        switch (style) {
            case 'Grey-Mode':
                href = './css/grey_styles.css'
                selectedIndex = 0;
                break;
            
            case 'Blue-Mode':
                href = './css/blue_styles.css'
                selectedIndex = 1;
                break;
            
            default:
                href = './css/grey_styles.css'
                selectedIndex = 0;
                style = 'Grey-Mode';
                break;
        }

        this.stylesheet.href = href;
        this.styleDropdown.selectedIndex = selectedIndex;
        this.setPreferredStyle(style);
    }

    showNotesList() {
        const searchText = this.searchNote.value;
        const sortBy = this.sortNote[this.sortNote.selectedIndex].value;
        const filterBy = this.filterNote[this.filterNote.selectedIndex].value;
        this.notesListContainer.innerHTML = this.notesListTemplateCompiled(this.service.getNotes(searchText, sortBy, filterBy));
    }

    showModal(mode, note = null) {
        const settings = {};
        if (mode == 'edit') {
            settings['mode'] = 'Edit';
            settings['title'] = note.title;
            settings['priority'] = note.priority;
            settings['note'] = note.note;
            settings['dueDate'] = convertDateToIso(note.dueDate);
            settings['finished'] = note.finished;
            settings['id'] = note.id;
        } else {
            settings['mode'] = 'Add';
        }
        
        this.modalNote.innerHTML = this.noteModalTemplateCompiled(settings);
        this.modalNote.style.display = 'grid';
    }

    hideModal() {
        this.modalNote.style.display = 'none';
    }

    initializeEventHandlers() {
        //https://developer.mozilla.org/en-US/docs/Web/Events
        this.styleDropdown.addEventListener('change', () => {
            this.setStylesheet(this.styleDropdown[this.styleDropdown.selectedIndex].text);
        });

        this.filterNote.addEventListener('input', () => {
            this.showNotesList();
        });

        this.searchNote.addEventListener('change', () => {
            this.showNotesList();
        });

        this.sortNote.addEventListener('change', () => {
            this.showNotesList();
        });

        this.addNote.addEventListener('click', () => {
            this.showModal('add');
        });

        this.modalNote.addEventListener('click', (event) => {
            switch (event.target.id) {
                case 'modal-cancel':
                    this.hideModal();
                    break;
                
                case 'modal-remove':
                    this.service.removeNoteById(event.target.dataset.noteId);
                    this.showNotesList();
                    this.hideModal();
                    break;
            }            
        });

        this.modalNote.addEventListener('submit', (event) => {
            const modalNoteId = document.activeElement.dataset.noteId;
            const modalNoteTitle = document.getElementById('modal-note-title').value;
            const modalNotePriority = document.getElementById('modal-note-priority').options[document.getElementById('modal-note-priority').selectedIndex].value;
            const modalNoteNote = document.getElementById('modal-note-note').value;
            const modalNoteFinished = document.getElementById('modal-note-finished').checked;
            const modalNoteDueDate= Date.parse(document.getElementById('modal-note-duedate').value);
            
            if (modalNoteId) {
                this.service.editNote(modalNoteId, modalNoteTitle, modalNotePriority, modalNoteDueDate, modalNoteNote, modalNoteFinished, modalNoteFinished ? getUnixTimestamp() : null);
            } else {
                this.service.newNote(modalNoteTitle, modalNotePriority, modalNoteDueDate, modalNoteNote, modalNoteFinished, modalNoteFinished ? getUnixTimestamp() : null);
            }
            
            event.preventDefault();
            this.showNotesList();
            this.hideModal();
        });

        this.notesListContainer.addEventListener('dblclick', (event) => {
            if (event.target.dataset.noteId) {
                this.showModal('edit', this.service.getNoteById(event.target.dataset.noteId));
            }
        });

        this.notesListContainer.addEventListener('change', (event) => {
            if (event.target.dataset.noteId) {
                this.service.setNoteFinished(event.target.dataset.noteId, event.target.checked);
                this.showNotesList();
            }
        });
    }

    renderView() {
        this.showNotesList();
    }

    startApplication() {
        this.setStylesheet(this.getPreferredStyle());
        this.initializeEventHandlers();
        this.renderView();
    }
}