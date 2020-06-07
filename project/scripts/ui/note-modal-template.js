'use strict';

export const noteModalTemplate = `
<!-- start modal-content -->
<div class="modal-content">

<!-- start modal-content-header -->
<header class="modal-content-header">
    <h1>Add new note</h1>
</header>
<!-- end modal-content-header -->

<form class="modal-content-form">
    <div class="modal-content-form-title">
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" value="TEST">
    </div>

    <div class="modal-content-form-priority">
    <label for="priority">Priority:</label>
    <select id="priority" name="priority">
        <option value="1">1</option>
        <option value="2" selected>2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    </div>

    <div class="modal-content-form-duedate">
    <label for="duedate">Due date:</label>
    <input type="date" id="duedate" name="duedate" value="2020-01-30">
    </div>

    <div class="modal-content-form-note">
    <textarea name="note">test...</textarea>
    </div>

    <div class="modal-content-form-finishedcheckbox">
    <label for="modal-finishedNotes">Finished</label>
    <input type="checkbox" id="modal-finishedNotes" name="modal-finishedNotes" value="-modalfinishedNotes">
    </div>

    <div class="modal-content-form-finisheddate">
    <input type="date" id="finisheddate" name="duedate" readOnly value="2020-01-30">
    </div>

    <div class="modal-content-form-button">
    <button id="modal-remove" type="button"><i class="fas fa-trash-alt"></i> Remove</button>
    <button id="modal-cancel" type="button"><i class="far fa-window-close"></i> Cancel</button>
    <button id="modal-save" type="button"><i class="fas fa-save"></i> Save</button>
    </div>
</form>

</div>
<!-- end modal-content -->
`