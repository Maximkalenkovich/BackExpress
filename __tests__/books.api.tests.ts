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
});
