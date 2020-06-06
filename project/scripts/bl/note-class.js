export class Note {
    constructor(title = 'This is the note title', priority = 1, dueDate = (getUnixTimestamp() + 86400), note = 'This is the note body.', finished = false, dateFinished = '-', dateCreated = getUnixTimestamp()) {
      this.id = uuidv4();
      this.title = title;
      this.priority = priority;
      this.dueDate = dueDate;
      this.note = note;
      this.finished = finished;
      this.dateFinished = dateFinished;
      this.dateCreated = dateCreated;
    }
  }