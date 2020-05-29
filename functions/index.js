const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllBooks,
    addBooks
} = require('./APIs/books')

app.get('/books', getAllBooks);
app.post('/books', addBooks);


exports.api = functions.https.onRequest(app);