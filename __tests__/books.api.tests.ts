const request = require('supertest');
import { app } from '../src/server';

describe('Books API', () => {
  it('GET /books', async () => {
    await request(app)
      .get('/books')
      .expect(200, [{ id: 1, name: 'child', version: '1.0.0' },
        { id: 2, name: 'non-child', version: '1.0.0' },
        { id: 3, name: 'parent', version: '1.0.0' },
        { id: 4, name: 'parent and child', version: '1.0.0' },
        { id: 5, name: 'new book', version: '1.0.0' }]);
  });

  it('404 not found', async () => {
    await request(app)
      .get('/books/789678678')
      .expect(404);
  });

  it('POST /books', async () => {
    await request(app)
      .post('/books')
      .send({ name: 'test book', version: '1.0.0' })
      .expect(200, { id: 6, name: 'test book', version: '1.0.0' });
  });
  it('DELETE /books/:id', async () => {
    await request(app)
      .delete('/books/2')
      .expect(204);
  });
  it ('PUT /books/:id', async () => {
    await request(app)
      .put('/books/2')
      .send({ name: 'test book', version: '1.0.0' })
      .expect(200, { id: 2, name: 'test book', version: '1.0.0' });
  })
});
