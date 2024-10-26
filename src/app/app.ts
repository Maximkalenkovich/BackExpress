import express, { Response } from 'express';
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from '../types/types';

export const app = express();

type CourseType = {
  id: number;
  name: string;
  version: string;
};

const db: { books: CourseType[] } = {
  books: [
    { id: 1, name: 'child', version: '1.0.0' },
    { id: 2, name: 'non-child', version: '1.0.0' },
    { id: 3, name: 'parent', version: '1.0.0' },
    { id: 4, name: 'parent and child', version: '1.0.0' },
    { id: 5, name: 'new book', version: '1.0.0' },
  ],
};

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/books', (req: RequestWithQuery<{ name: string }>, res: Response<CourseType[] | { message: string }>) => {
  let foundBooks: CourseType[] = db.books;

  if (req.query.name) {
    foundBooks = foundBooks.filter((b) => b.name.indexOf(req.query.name as string) > -1);
  }

  if (!db.books) {
    res.sendStatus(404).json({ message: 'Course not found' });
    return;
  }
  res.json(foundBooks);
});
app.get('/books/:id', (req: RequestWithParams<{ id: string }>, res: Response<CourseType | { message: string }>) => {
  const foundBooks = db.books.find((i) => i.id === parseInt(req.params.id));

  if (!foundBooks) {
    res.sendStatus(404).json({ message: 'Course not found' });
    return;
  }

  res.json(foundBooks);
});
app.post('/books', (req: RequestWithBody<CourseType>, res: Response<CourseType | { message: string }>) => {
    if (!req.body.name) {
      res.sendStatus(404).json({ message: 'Course not found' });
      return;
    }

    const newBook = { id: db.books.length + 1, name: req.body.name, version: req.body.version || '1.0.0' };
    db.books.push(newBook);
    res.status(200).json(newBook);
  },
);
app.delete('/books/:id', (req: RequestWithParams<{ id: string }>, res) => {

  const foundBooks = db.books.find((i) => i.id === parseInt(req.params.id));

  if (!foundBooks) {
    res.sendStatus(404).json({ message: 'Course not found' });
    return;
  }

  db.books = db.books.filter((i) => i.id !== +req.params.id);

  res.sendStatus(204);
});

app.put('/books/:id', (req: RequestWithParamsAndBody<{ id: string }, { name: string, version: string }>, res) => {
  const foundBooks = db.books.find((i) => i.id === parseInt(req.params.id));

  if (!foundBooks) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }

  foundBooks.name = req.body.name;
  foundBooks.version = req.body.version; // Добавляем обновление версии

  res.json(foundBooks);
});