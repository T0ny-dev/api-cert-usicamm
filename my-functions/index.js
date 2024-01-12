const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir solicitudes desde cualquier origen (CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Ruta para obtener todos los certificados
app.get('/.netlify/functions/certificates', (req, res) => {
  const certificates = [];

  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
      certificates.push(row);
    })
    .on('end', () => {
      res.json(certificates);
    });
});

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});
