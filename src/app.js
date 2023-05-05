const express = require('express');
const fs = require('fs');
const path = require('path');
const methodOverride = require('method-override');
const app = express();
const port = 3000;
let noticias = [];

crearNoticias();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
//Paths estaticos
publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));
app.use(express.static('node_modules'));

const multer = require('multer'); // Importa el módulo "multer" para manejar archivos
// Configura "multer" para guardar la imagen en la carpeta "public/img"
const storage = multer.diskStorage({
  destination: publicPath + '/assets/images',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.render(publicPath + '/index', { noticias: noticias }, (err, html) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error al renderizar la vista');
    } else {
      res.status(200).send(html);
    }
  });
});

app.get('/noticias_get', (req, res) => {
  if (noticias.length > 0) {
    res.status(200).json(noticias);
  } else {
    res.status(404).send('No se encontraron noticias');
  }
});

app.post('/crearNoticia', upload.single('imagen'), (req, res) => {
  const { titulo, contenido } = req.body;
  if (titulo && contenido) {
    const id = noticias[noticias.length - 1].id + 1;
    const noticia = {
      id,
      titulo,
      contenido,
      image: '/assets/images/' + req.file.filename,
    };
    noticias.push(noticia);
    res.redirect('/');
  } else {
    res.status(400).send('Datos de noticia incompletos');
  }
});

app.delete('/noticia/:id', (req, res) => {
  const noticiaId = parseInt(req.params.id);
  if (noticiaId) {
    eliminarNoticia(noticiaId);
    res.redirect('/');
  } else {
    res.status(400).send('ID de noticia no válido');
  }
});

app.put('/noticia_update/:id', (req, res) => {
  const noticiaId = parseInt(req.params.id);
  const { titulo, contenido, imagen } = req.body;
  if (noticiaId && titulo && contenido) {
    for (let i = 0; i < noticias.length; i++) {
      if (noticias[i].id === noticiaId) {
        noticias[i].titulo = titulo;
        noticias[i].contenido = contenido;
        break;
      }
    }
    res.sendStatus(200);
  } else {
    res.status(400).send('Datos de noticia incompletos o ID no válido');
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function crearNoticias() {
  var noticia = {
    image: 'assets/images/image-retro-pcs.jpg',
    id: noticias.length + 1,
    titulo: 'Reviving Retro PCs',
    contenido: 'What happens when old PCs are given modern upgrades?',
  };
  noticias.push(noticia);

  var noticia2 = {
    image: 'assets/images/image-top-laptops.jpg',
    id: noticias.length + 1,
    titulo: 'Top 10 Laptops of 2022',
    contenido: 'Our best picks for various needs and budgets.',
  };
  noticias.push(noticia2);

  var noticia3 = {
    image: 'assets/images/image-gaming-growth.jpg',
    id: noticias.length + 1,
    titulo: 'The Growth of Gaming',
    contenido: 'How the pandemic has sparked fresh opportunities.',
  };
  noticias.push(noticia3);
}

function eliminarNoticia(id) {
  noticias = noticias.filter((noticia) => noticia.id !== id);
  noticias.forEach((noticia, index) => {
    noticia.id = index + 1;
  });
}
