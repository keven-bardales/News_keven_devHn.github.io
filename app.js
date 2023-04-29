const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
let noticias = [];
var bodyParser = require('body-parser');

var publicPath = path.resolve(__dirname, 'css');

app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(express.static('assets'));

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'index.html'), (err, datosArchivo) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(datosArchivo);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

var noticia = {
  id: '01',
  titulo: 'Reviving Retro PCs',
  contenido: 'What happens when old PCs are given modern upgrades?',
};
noticias.push(noticia);
var noticia = {
  id: '02',
  titulo: 'Top 10 Laptops of 2022',
  contenido: 'Our best picks for various needs and budgets.',
};
noticias.push(noticia);
var noticia = {
  id: '03',
  titulo: 'The Growth of Gaming',
  contenido: 'How the pandemic has sparked fresh opportunities.',
};
