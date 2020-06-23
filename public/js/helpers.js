'use strict';

// Get unix timestamp
function getUnixTimestamp() {
    return Math.floor(Date.now());
}

// Convert date to ISO 8601 format
function convertDateToIso(date) {
    date = new Date(date);
    return date.toISOString().substring(0, 10);
} 

// Export the funtions
export { getUnixTimestamp, convertDateToIso};