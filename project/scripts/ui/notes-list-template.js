'use strict';

export const notesListTemplate = `
{{#each this}}
    <!-- start main-content-card -->
    <section class="main-content-card">

    <!-- start main-content-card-header -->
    <header class="main-content-card-header">
        {{title}}
    </header>
    <!-- end main-content-card-header -->

    <!-- start main-content-card-body -->
    <div class="main-content-card-body">
        
        {{#each notes}}
        <!-- start content-card -->
        <article data-note-id="{{id}}" class="content-card">

        <!-- start content-card-header -->
        <header data-note-id="{{id}}" class="content-card-header">
            {{title}}
            {{#times priority}}
            <i class="fas fa-exclamation"></i>
            {{/times}}
        </header>
        <!-- end content-card-header -->

        <!-- start content-card-body -->
        <div data-note-id="{{id}}" class="content-card-body">
            {{note}}
        </div>
        <!-- end content-card-body -->

        <!-- start content-card-footer -->
        <footer data-note-id="{{id}}" class="content-card-footer">
            <input data-note-id="{{id}}" type="checkbox" id="finishedNotes-{{id}}" name="finishedNotes-{{id}}" value="finishedNotes" {{#if finished}}checked{{/if}}>
            <label for="finishedNotes-{{id}}">Finished</label>
        </footer>
        <!-- end content-card-footer -->

        </article>
        <!-- end content-card -->
        {{/each}}
        
    </div>
    <!-- end main-content-card-body -->

    </section>
    <!-- end main-content-card -->
{{/each}}
`;