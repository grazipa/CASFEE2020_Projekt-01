'use strict';

// Get unix timestamp
function getUnixTimestamp() {
    return Math.floor(Date.now());
}

// Generate a UUID in version 4
function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

// Extend Handlebars
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


// Convert date to ISO 8601 format
function convertDateToIso(date) {
    date = new Date(date);
    return date.toISOString().substring(0, 10);
} 

// Export the funtions
export { getUnixTimestamp, getUUID, convertDateToIso};