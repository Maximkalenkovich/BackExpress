import { CourseType } from '../types/types';
export const db: { books: CourseType[] } = {
  books: [
    { id: 1, name: 'child', version: '1.0.0' },
    { id: 2, name: 'non-child', version: '1.0.0' },
    { id: 3, name: 'parent', version: '1.0.0' },
    { id: 4, name: 'parent and child', version: '1.0.0' },
    { id: 5, name: 'new book', version: '1.0.0' },
  ],
};
