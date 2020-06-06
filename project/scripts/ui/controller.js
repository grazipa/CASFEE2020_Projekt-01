import {notesListTemplate} from './notes-list-template.js';

export class Controller {
    constructor(service) {
        this.service = service;

        this.notesListTemplateCompiled = Handlebars.compile(notesListTemplate);

        this.notesListContainer = document.getElementById('notes-list-container');
        this.styleDropdown = document.getElementById('style-dropdown');
        this.stylesheet = document.getElementById('stylesheet');
    }

    getPreferredStyle() {
        let preferredStyle = '';
        if (document.cookie) {
            preferredStyle = document.cookie.split('; ').find(row => row.startsWith('style')).split('=')[1];
        }

        preferredStyle = preferredStyle !== '' ? preferredStyle : 'Blue-Mode';
        this.setPreferredStyle(preferredStyle);
        return preferredStyle;
    }

    setPreferredStyle(style) {
        const date = new Date();
        date.setTime(date.getTime() + (30 * 86400 * 1000));
        document.cookie = `style=${style}; expires=${date.toUTCString()}`;
    }

    setStylesheet(style) {
        let href = '';
        let selectedIndex = 0;

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
                throw `Style '${style}' is not defined!`;
        }

        this.stylesheet.href = href;
        this.styleDropdown.selectedIndex = selectedIndex;
        this.setPreferredStyle(style);
    }

    showNotesList() {
        this.notesListContainer.innerHTML = this.notesListTemplateCompiled();
    }

    initializeEventHandlers() {
        this.styleDropdown.addEventListener('change', (event) => {
            this.setStylesheet(this.styleDropdown[this.styleDropdown.selectedIndex].text);
        });
    }

    renderView() {
        this.showNotesList();
    }

    startApplication() {
        this.setStylesheet(this.getPreferredStyle());
        this.initializeEventHandlers();
        this.service.loadData();
        this.renderView();
    }
}