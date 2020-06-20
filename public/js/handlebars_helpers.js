'use strict';

Handlebars.registerHelper('times', function(n, block) {
    let accum = '';

    for (let i = 0; i < n; i ++) {
        accum += block.fn(i);
    }

    return accum;
});

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});