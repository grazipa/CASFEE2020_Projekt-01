'use strict';

//Check for session
if ('style' in localStorage) {

  // Check if correct style
  if (localStorage.getItem('style') !== document.getElementById('websiteStyle').options[document.getElementById('websiteStyle').selectedIndex].value) {
    switch (localStorage.getItem('style')) {
      case 'grey':
        document.getElementById('websiteStyle').selectedIndex = 0;
        document.getElementById('stylesheet').href = './css/grey_styles.css';
        localStorage.setItem('style', 'grey');
        break;
      
      case 'blue':
        document.getElementById('websiteStyle').selectedIndex = 1;
        document.getElementById('stylesheet').href = './css/blue_styles.css';
        localStorage.setItem('style', 'blue');
        break;
    }
  }

} else {
  localStorage.setItem('style', document.getElementById('websiteStyle').options[document.getElementById('websiteStyle').selectedIndex].value);
}

// Change mode
document.getElementById('websiteStyle').onchange = function () {
  switch (document.getElementById('websiteStyle').options[document.getElementById('websiteStyle').selectedIndex].value) {
    case 'grey':
      document.getElementById('stylesheet').href = './css/grey_styles.css';
      localStorage.setItem('style', 'grey');
      break;
    
    case 'blue':
      document.getElementById('stylesheet').href = './css/blue_styles.css';
      localStorage.setItem('style', 'blue');
      break;
  }
};

// Open modal
document.getElementById('newNote').onclick = function() {
  document.getElementById('newNoteModal').style.display = 'grid';
}

document.getElementById('cancel').onclick = function() {
  document.getElementById('newNoteModal').style.display = 'none';
}



// Class
class Note {
  constructor(title, priority, duedate, note, finished, datefinished) {
    this.title = title; //string
    this.priority = priority; //int
    this.duedate = duedate; //date
    this.note = note; //string
    this.finished = finished; //boolean
    this.datefinished = datefinished; //open / finished
  }
}

class Notes {
  constructor() {
    this.notes = [];
  }

  //Get notes
  getNotes(sortedBy = 'priority') {
    const notes = {};
    switch (sortedBy) {
      case 'priority':
        for (let note of this.notes) {
          if (note.priority in notes) {
            notes[note.priority].push(note);
          } else {
            notes[note.priority] = [note];
          }
        }
        break;

      default:
        throw (`sort mode '${sortedBy}' is not implemented!`);
        break;
    }

    return notes;
  }


}

const randomText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, vel numquam impedit perspiciatis quam ipsum nisi delectus earum error autem similique rerum molestias accusantium eveniet, nostrum temporibus corporis cumque perferendis hic quas nulla et? Adipisci aliquid neque possimus dolor quaerat dignissimos quam, similique, natus, ex provident pariatur quod autem vitae doloribus quas quasi voluptas explicabo? Aut placeat numquam cumque minus, at veritatis laudantium quasi voluptatem in sit unde minima rerum nisi eum illum necessitatibus vero deserunt ducimus soluta eius rem. Ipsum ut saepe blanditiis corrupti quisquam aliquid, perspiciatis quidem enim temporibus accusamus! Nesciunt quos facere dolorum excepturi veniam. Assumenda, rem.';
const notesCount = Math.floor(Math.random() * 50) + 20;
const current_time = Date.now();
const notes = new Notes();
for (let i = 0; i < notesCount; i ++) {
  const title = randomText.substring(0, Math.floor(Math.random() * 30) + 10);
  const priority = Math.floor(Math.random() * 5) + 1;
  const duedate = current_time + (Math.floor(Math.random() * 4000) + 1500);
  const note = randomText.substring(0, Math.floor(Math.random() * 250));
  const finished = Math.floor(Math.random() * 2) + 1 === 1 ? true : false;
  const datefinished = finished === true ? duedate + (Math.floor(Math.random() * 4000) + 1500) : null;

  const note2 = new Note(title, priority, duedate, note, finished, datefinished);
  notes.notes.push(note2);
}

// handlebarsjs
Handlebars.registerHelper('times', function(n, block) {
  var accum = '';
  for(var i = 0; i < n; ++i)
      accum += block.fn(i);
  return accum;
});

let source = document.getElementById("entry-template").innerHTML;
let template = Handlebars.compile(source);
let html = template(notes.getNotes());
console.log(html);
document.getElementById("TEST").innerHTML = html;