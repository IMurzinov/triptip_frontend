const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Переадресация c http://localhost:8080/test
app.get('/test', (req, res) => {
  res.redirect('http://triptip.pro/test');
});

// Скачивает локальные файлы, если путь переадресации не был найден
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});