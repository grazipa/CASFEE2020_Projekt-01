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
        <article class="content-card">

        <!-- start content-card-header -->
        <header data-id="{{id}}" class="content-card-header">
            {{title}}
            {{#times priority}}
            <i class="fas fa-exclamation"></i>
            {{/times}}
        </header>
        <!-- end content-card-header -->

        <!-- start content-card-body -->
        <div class="content-card-body">
            {{note}}
        </div>
        <!-- end content-card-body -->

        <!-- start content-card-footer -->
        <footer class="content-card-footer">
            {{#if finished}}
            <input type="checkbox" id="finishedNotes" name="finishedNotes" value="finishedNotes" checked>
            {{else}}
            <input type="checkbox" id="finishedNotes" name="finishedNotes" value="finishedNotes">
            {{/if}}
            <label for="finishedNotes">Finished</label>
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