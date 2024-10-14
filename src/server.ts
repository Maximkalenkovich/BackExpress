import express from 'express';

const app = express();
const port = 3001;

const db = {
  courses: [
    { id: 1, name: 'serverExpress', version: '1.0.0' },
    { id: 2, name: 'serverExpress', version: '1.0.0' },
    { id: 3, name: 'serverExpress', version: '1.0.0' },
    { id: 4, name: 'serverExpress', version: '1.0.0' },
  ],
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/courses', (req, res) => {
  if (!db.courses) {
    res.sendStatus(404).json({ message: 'Course not found' });
    return;
  }
  res.json(db.courses);
});

app.get('/courses/:id', (req, res) => {
  const foundCourses = db.courses.find((i) => i.id === parseInt(req.params.id));

  if (!foundCourses) {
    res.sendStatus(404).json({ message: 'Course not found' });
    return;
  }

  res.json(foundCourses);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
