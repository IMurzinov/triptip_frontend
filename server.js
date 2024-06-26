const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});




// const PORT = 8080;







// Переадресация c http://localhost:8080/test
// app.get('/test', (req, res) => {
//   res.redirect('http://triptip.pro/test');
// });