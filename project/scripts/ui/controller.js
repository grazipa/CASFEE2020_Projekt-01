import {notesListTemplate} from './notes-list-template.js';
import {noteModalTemplate} from './note-modal-template.js';

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
        this.styleDropdown.addEventListener('change', (event) => {
            this.setStylesheet(this.styleDropdown[this.styleDropdown.selectedIndex].text);
        });

        this.filterNote.addEventListener('input', (event) => {
            this.showNotesList();
        });

        this.searchNote.addEventListener('change', (event) => {
            this.showNotesList();
        });

        this.sortNote.addEventListener('change', (event) => {
            this.showNotesList();
        });

        this.addNote.addEventListener('click', (event) => {
            this.showModal('add');
        });

        this.modalNote.addEventListener('click', (event) => {
            switch (event.target.id) {
                case 'modal-cancel':
                    this.hideModal();
                    break;
            }
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