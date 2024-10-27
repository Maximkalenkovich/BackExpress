import { Response, Router } from 'express';
import {
  CourseType,
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from '../types/types';
import { db } from '../localDB/db';

export const productsRoute = Router({});
productsRoute.get('/', (req: RequestWithQuery<{ name: string }>, res: Response<CourseType[] | {
  message: string
}>) => {
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
productsRoute.get('/:id', (req: RequestWithParams<{ id: string }>, res: Response<CourseType | {
  message: string
}>) => {
  const foundBooks = db.books.find((i) => i.id === parseInt(req.params.id));

  if (!foundBooks) {
    res.sendStatus(404).json({ message: 'Course not found' });
    return;
  }

  res.json(foundBooks);
});
productsRoute.post('/', (req: RequestWithBody<CourseType>, res: Response<CourseType | { message: string }>) => {
    if (!req.body.name) {
      res.sendStatus(404).json({ message: 'Course not found' });
      return;
    }

    const newBook = { id: db.books.length + 1, name: req.body.name, version: req.body.version || '1.0.0' };
    db.books.push(newBook);
    res.status(200).json(newBook);
  },
);
productsRoute.delete('/:id', (req: RequestWithParams<{ id: string }>, res) => {

  const foundBooks = db.books.find((i) => i.id === parseInt(req.params.id));

  if (!foundBooks) {
    res.sendStatus(404).json({ message: 'Course not found' });
    return;
  }

  db.books = db.books.filter((i) => i.id !== +req.params.id);

  res.sendStatus(204);
});

productsRoute.put('/:id', (req: RequestWithParamsAndBody<{ id: string }, {
  name: string,
  version: string
}>, res) => {
  const foundBooks = db.books.find((i) => i.id === parseInt(req.params.id));

  if (!foundBooks) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }

  foundBooks.name = req.body.name;
  foundBooks.version = req.body.version;

  res.json(foundBooks);
});
