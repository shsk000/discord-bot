const API_KEY = process.env.GOOGLE_API_KEY;
const CSE_ID = process.env.GOOGLE_CSE_ID;

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