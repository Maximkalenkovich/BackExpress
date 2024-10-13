"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
app.get('/courses', (req, res) => {
    res.json([
        { id: 1, name: 'serverExpress', version: '1.0.0' },
        { id: 2, name: 'serverExpress', version: '1.0.0' },
        { id: 3, name: 'serverExpress', version: '1.0.0' },
        { id: 4, name: 'serverExpress', version: '1.0.0' }
    ]);
});
app.get('/courses/:id', (req, res) => {
    const foundCourses = [
        { id: 1, name: 'serverExpress', version: '1.0.0' },
        { id: 2, name: 'serverExpress', version: '1.0.0' },
        { id: 3, name: 'serverExpress', version: '1.0.0' },
        { id: 4, name: 'serverExpress', version: '1.0.0' }
    ].find(i => i.id === parseInt(req.params.id));
    if (!foundCourses) {
        res.status(404).json({ message: 'Course not found' });
        return;
    }
    res.json(foundCourses);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
