import {notesListTemplate} from './notes-list-template.js';

export class Controller {
    constructor(service) {
        this.service = service;

        this.notesListTemplateCompiled = Handlebars.compile(notesListTemplate);

        this.notesListContainer = document.getElementById('notes-list-container');
        this.styleDropdown = document.getElementById('style-dropdown');
        this.stylesheet = document.getElementById('stylesheet');
        
        this.cookie = document.cookie;
    }

    getPreferredStyle() {
        let preferredStyle = '';
        if (this.cookie) {
            preferredStyle = this.cookie.split('; ').find(row => row.startsWith('style')).split('=')[1];
        }

        return (preferredStyle !== '' ? preferredStyle : 'Blue-Mode');
    }

    setPreferredStyle(style) {
        this.cookie = `style=${style}`;
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