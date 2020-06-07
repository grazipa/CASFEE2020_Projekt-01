'use strict';

export const noteModalTemplate = `
<!-- start modal-content -->
<div class="modal-content">

<!-- start modal-content-header -->
<header class="modal-content-header">
    <h1>{{mode}} note</h1>
</header>
<!-- end modal-content-header -->

<form class="modal-content-form">
    <div class="modal-content-form-title">
        <label for="title">Title:</label>
        <input type="text" id="modal-note-title" name="title" value="{{title}}" maxlength="30" required>
    </div>

    <div class="modal-content-form-priority">
        <label for="modal-note-priority">Priority:</label>
        <select id="modal-note-priority" name="modal-note-priority">
            <option {{#ifEquals 1 priority}}selected{{/ifEquals}} value="1">1</option>
            <option {{#ifEquals 2 priority}}selected{{/ifEquals}} value="2">2</option>
            <option {{#ifEquals 3 priority}}selected{{/ifEquals}} value="3">3</option>
            <option {{#ifEquals 4 priority}}selected{{/ifEquals}} value="4">4</option>
            <option {{#ifEquals 5 priority}}selected{{/ifEquals}} value="5">5</option>
        </select>
    </div>

    <div class="modal-content-form-duedate">
        <label for="modal-note-duedate">Due date:</label>
        <input type="date" id="modal-note-duedate" name="modal-note-duedate" value="{{dueDate}}" required>
    </div>

    <div class="modal-content-form-note">
        <textarea id="modal-note-note" name="note" required>{{note}}</textarea>
    </div>

    <div class="modal-content-form-finishedcheckbox">
        <label for="modal-note-finished">Finished</label>
        <input {{#if finished}}checked{{/if}} type="checkbox" id="modal-note-finished" name="modal-note-finished">
    </div>

    <div class="modal-content-form-button">
        {{#ifEquals 'Edit' mode}}
        <button data-note-id="{{id}}" id="modal-remove" type="button"><i class="fas fa-trash-alt"></i> Remove</button>
        {{/ifEquals}}
        <button id="modal-cancel" type="button"><i class="far fa-window-close"></i> Cancel</button>
        <button data-note-id="{{id}}" id="modal-save" type="button"><i class="fas fa-save"></i> Save</button>
    </div>
</form>

</div>
<!-- end modal-content -->
`