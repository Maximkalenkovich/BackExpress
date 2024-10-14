"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
const db = {
    books: [
        { id: 1, name: 'child', version: '1.0.0' },
        { id: 2, name: 'non-child', version: '1.0.0' },
        { id: 3, name: 'parent', version: '1.0.0' },
        { id: 4, name: 'parent and child', version: '1.0.0' },
        { id: 5, name: 'new book', version: '1.0.0' },
    ],
};
const jsonMiddleware = express_1.default.json();
app.use(jsonMiddleware);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/books', (req, res) => {
    let foundBooks = db.books;
    if (req.query.name) {
        foundBooks = foundBooks.filter((b) => b.name.indexOf(req.query.name) > -1);
    }
    if (!db.books) {
        res.sendStatus(404).json({ message: 'Course not found' });
        return;
    }
    res.json(foundBooks);
});
app.get('/books/:id', (req, res) => {
    const foundBooks = db.books.find((i) => i.id === parseInt(req.params.id));
    if (!foundBooks) {
        res.sendStatus(404).json({ message: 'Course not found' });
        return;
    }
    res.json(foundBooks);
});
app.post('/books', (req, res) => {
    if (!req.body.name) {
        res.sendStatus(404).json({ message: 'Course not found' });
        return;
    }
    const newBook = { id: db.books.length + 1, name: req.body.name, version: req.body.version || '1.0.0' };
    db.books.push(newBook);
    res.status(200).json(newBook);
});
app.delete('/books/:id', (req, res) => {
    const foundBooks = db.books.find((i) => i.id === parseInt(req.params.id));
    if (!foundBooks) {
        res.sendStatus(404).json({ message: 'Course not found' });
        return;
    }
    db.books = db.books.filter((i) => i.id !== +req.params.id);
    res.sendStatus(204);
});
app.put('/books/:id', (req, res) => {
    const foundBooks = db.books.find((i) => i.id === parseInt(req.params.id));
    if (!foundBooks) {
        res.sendStatus(404).json({ message: 'Course not found' });
        return;
    }
    foundBooks.name = req.body.name;
    res.json(foundBooks);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
