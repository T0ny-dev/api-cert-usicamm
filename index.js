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
app.get('/certificates', (req, res) => {
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

// Ruta para obtener un certificado específico por su ID
app.get('/certificates/:id', (req, res) => {
  const certificates = [];

  fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
      certificates.push(row);
    })
    .on('end', () => {
      const certId = req.params.id;

      const certificate = certificates.find((cert) => cert.Folio === certId);

      if (certificate) {
        res.json(certificate);
      } else {
        res.status(404).json({ error: 'Certificado no encontrado' });
      }
    });
});

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://localhost:${PORT}`);
});
