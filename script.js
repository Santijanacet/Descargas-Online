 const urlInput = document.querySelector("input");
 const btnDown = document.querySelector("button");

// btnDown.addEventListener("click", async () => {
//   try {
//     const respuesta = await fetch(urlInput.value);
//     if (urlInput.value === "") {
//       Swal.fire({
//         icon: 'error',
//         title: 'Atención...',
//         text: 'El campo de la URL no puede estar vacio',
//       }) 
//     }else {
//       const archivo = await respuesta.blob();
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(archivo);
//       link.download = new Date().getTime().toString(); // Convierte a cadena de texto
//       link.click();
//     }
//   } catch (error) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: 'Al parecer algo salió mal',
//     })
//   }
// });
btnDown.addEventListener("click", async () => {
  try {
    const url = urlInput.value;

    if (!isValidURL(url)) {
      Swal.fire({
        icon: 'error',
        title: 'URL Inválida',
        text: 'Por favor, ingrese una URL válida',
      });
      return;
    }

    const response = await fetch(url);

    if (!response.ok) {
      Swal.fire({
        icon: 'error',
        title: 'Error en la Descarga',
        text: 'No se pudo descargar el archivo',
      });
      return;
    }

    const archivo = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(archivo);
    link.download = getFileNameFromURL(url); // Obtiene el nombre del archivo de la URL
    link.click();
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Al parecer algo salió mal',
    });
  }
});

function isValidURL(url) {
  const pattern = new RegExp('^(https?:\\/\\/)?'+ // Protocolo
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // Nombre de dominio
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // O también, dirección IP (v4) 
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // Puerto y ruta
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // Parámetros de la consulta
    '(\\#[-a-z\\d_]*)?$','i'); // Fragmento
  return pattern.test(url);
}

function getFileNameFromURL(url) {
  const segments = url.split('/');
  return segments[segments.length - 1];
}




