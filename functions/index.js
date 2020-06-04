const functions = require('firebase-functions');
const app = require('express')();
const cors = require("cors");

const {
    getAllBooks,
    addBooks,
    editBooks,
    deleteBook
} = require('./APIs/books')
app.use(cors());
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method"
        );
        if (req.method === "OPTIONS") {
        return res.status(200).end();
        }
        next();
        });

app.get('/books', getAllBooks);
app.post('/books', addBooks);
app.put('/books/:id', editBooks);
app.delete('/books/:id', deleteBook);
app.get('/books/:category', getAllBooks);


exports.api = functions.https.onRequest(app);