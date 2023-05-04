const express = require('express');
const fs = require('fs');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
let noticias = [];

var noticia = {
  image: '/images/image-retro-pcs.jpg',
  id: noticias.length + 1,
  titulo: 'Reviving Retro PCs',
  contenido: 'What happens when old PCs are given modern upgrades?',
};
noticias.push(noticia);

var noticia2 = {
  image: '/images/image-top-laptops.jpg',
  id: noticias.length + 1,
  titulo: 'Top 10 Laptops of 2022',
  contenido: 'Our best picks for various needs and budgets.',
};
noticias.push(noticia2);

var noticia3 = {
  image: '/images/image-gaming-growth.jpg',
  id: noticias.length + 1,
  titulo: 'The Growth of Gaming',
  contenido: 'How the pandemic has sparked fresh opportunities.',
};
noticias.push(noticia3);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

var publicPath = path.resolve(__dirname, 'css');
app.use(express.static(publicPath));
app.use(express.static('node_modules'));
app.use(express.static('assets'));
app.use(express.static('js'));
app.set('view engine', 'ejs');
app.set('views', __dirname);

function eliminarNoticia(id) {
  noticias.forEach((noticia, index) => {
    if (id === noticia.id) {
      noticias.splice(index, 1);
    }
  });
  noticias.forEach((noticia, index) => {
    noticia.id = index + 1;
  });
}

app.get('/', (req, res) => {
  res.render('index', { noticias: noticias });
});

app.post('/crearNoticia', (req, res) => {
  const { titulo, contenido, image } = req.body;
  
  if (!titulo || !contenido || !image) {
    return res.status(400).send('Debe proporcionar todos los campos necesarios');
  }

  const id = noticias[noticias.length - 1].id + 1;
  const noticia = { id, titulo, contenido, image };
  noticias.push(noticia);
  res.redirect('/');
});


app.delete('/noticia/:id', (req, res) => {
  const noticiaId = parseInt(req.params.id);
  
  if (isNaN(noticiaId)) {
    return res.status(400).send('El ID de la noticia debe ser un número');
  }
  
  const noticia = noticias.find(noticia => noticia.id === noticiaId);
  
  if (!noticia) {
    return res.status(404).send('No se encontró la noticia');
  }
  
  eliminarNoticia(noticiaId);
  res.redirect('/');
});


app.put('/noticia_update/:id', (req, res) => {
  const noticiaId = parseInt(req.params.id);
  
  if (isNaN(noticiaId)) {
    return res.status(400).send('El ID de la noticia debe ser un número');
  }
  
  const noticia = noticias.find(noticia => noticia.id === noticiaId);
  
  if (!noticia) {
    return res.status(404).send('No se encontró la noticia');
  }
  
  const nuevosDatosNoticia = req.body;

  if (!nuevosDatosNoticia.titulo || !nuevosDatosNoticia.contenido || !nuevosDatosNoticia.imagen) {
    return res.status(400).send('Debe proporcionar todos los campos necesarios');
  }

  for (let i = 0; i < noticias.length; i++) {
    if (noticias[i].id === noticiaId) {
      noticias[i].titulo = nuevosDatosNoticia.titulo;
      noticias[i].contenido = nuevosDatosNoticia.contenido;
      noticias[i].imagen = nuevosDatosNoticia.imagen;
      break;
    }
  }

  res.redirect('/');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
