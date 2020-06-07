'use strict';

export class Storage {
    constructor() {
        this.storageName = 'notesStorage'
        this.mockdata();
        this.notes = JSON.parse(localStorage.getItem(this.storageName) || '[]');
    }

    getAll() {
        return this.notes;
    }

    mockdata() {
        const notes = [];

        const randomText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, vel numquam impedit perspiciatis quam ipsum nisi delectus earum error autem similique rerum molestias accusantium eveniet, nostrum temporibus corporis cumque perferendis hic quas nulla et? Adipisci aliquid neque possimus dolor quaerat dignissimos quam, similique, natus, ex provident pariatur quod autem vitae doloribus quas quasi voluptas explicabo? Aut placeat numquam cumque minus, at veritatis laudantium quasi voluptatem in sit unde minima rerum nisi eum illum necessitatibus vero deserunt ducimus soluta eius rem. Ipsum ut saepe blanditiis corrupti quisquam aliquid, perspiciatis quidem enim temporibus accusamus! Nesciunt quos facere dolorum excepturi veniam. Assumenda, rem.';
        const notesCount = Math.floor(Math.random() * 50) + 20;
        const current_time = Date.now();

        for (let i = 0; i < notesCount; i ++) {
            const id = getUUID();
            const title = randomText.substring(0, Math.floor(Math.random() * 30) + 10);
            const priority = Math.floor(Math.random() * 5) + 1;
            const datecreated = current_time + (Math.floor(Math.random() * 5) * 86400000);
            const duedate = datecreated + (Math.floor(Math.random() * 5) * 86400000);
            const note = randomText.substring(0, Math.floor(Math.random() * 250));
            const finished = Math.floor(Math.random() * 2) + 1 === 1 ? true : false;
            const datefinished = finished === true ? duedate + (Math.floor(Math.random() * 5) * 86400000) : null;

            const note2 = {'id': id, 'title': title, 'priority': priority, 'datecreated': datecreated, 'duedate': duedate, 'note': note, 'finished': finished, 'datefinished': datefinished};
            notes.push(note2);
        }

        this.update(notes);
    }

    update(notes) {
        this.notes = notes;
        localStorage.setItem(this.storageName, JSON.stringify(notes));
    }
}