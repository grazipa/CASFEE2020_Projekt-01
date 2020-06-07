export class Note {
    constructor(id = uuidv4(), title = 'This is the note title', priority = 1, dueDate = (getUnixTimestamp() + 86400), note = 'This is the note body.', finished = false, dateFinished = null, dateCreated = getUnixTimestamp()) {
      this.id = id;
      this.title = title;
      this.priority = priority;
      this.dueDate = dueDate;
      this.note = note;
      this.finished = finished;
      this.dateFinished = dateFinished;
      this.dateCreated = dateCreated;
    }
  }