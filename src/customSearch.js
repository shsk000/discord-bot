const argv = require('yargs').argv
const API_KEY = argv.googleApiKey;
const CSE_ID = argv.googleCSEId;

const {
    google
} = require('googleapis');
const customSearch = google.customsearch('v1');

const searchNum = 1;

module.exports = async (q) => {
    const start = Math.floor(Math.random() * 100);
    return await customSearch.cse.list({
        cx: CSE_ID,
        q,
        auth: API_KEY,
        searchType: 'image',
        safe: 'high',
        num: searchNum,
        start,
    });
}