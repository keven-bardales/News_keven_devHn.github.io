var edits = document.getElementsByClassName('edit');
var updateForms = document.getElementsByClassName('update_form');
var new_infos = document.getElementsByClassName('new_info');
var imgs = document.getElementsByClassName('new_img');
var fa_times = document.getElementsByClassName('fa_times');

function eliminarNoticia(noticiaId) {
  fetch(`/noticia/${noticiaId}`, {
    method: 'DELETE',
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error al eliminar noticia:', error);
    });
}
function actualizarNoticia(noticiaId) {
  const forms = document.getElementsByClassName('update_form');
  const titulo = forms[noticiaId - 1]['titulo'].value;
  const contenido = forms[noticiaId - 1]['contenido'].value;

  fetch(`/noticia_update/${noticiaId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ titulo, contenido }),
  })
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error al actualizar noticia:', error);
    });
}

for (let i = 0; i < edits.length; i++) {
  edits[i].addEventListener('click', (event) => {
    event.preventDefault();
    console.log('hola');
    updateForms[i].style.display = 'flex';
    new_infos[i].style.display = 'none';
    imgs[i].style.display = 'none';
    console.log(fa_times[i]);
  });
}

for (let i = 0; i < fa_times.length; i++) {
  fa_times[i].addEventListener('click', () => {
    updateForms[i].style.display = 'none';
    new_infos[i].style.display = 'flex';
    imgs[i].style.display = 'block';
    console.log('funciona');
  });
}
