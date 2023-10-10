async function onBuscarPlatillo() {
  const inputPlatillo = document.getElementById('inputPlatillo')
  const divContainer = document.querySelector('.container')
  if (inputPlatillo.value == '') {
    alert('Escriba el nombre de un platillo')
    return
  }
  mostrarCarga(true)
  const respuesta = await llamarAchatGpt(crearPrompt(inputPlatillo.value))
  divContainer.innerHTML = respuesta
  mostrarCarga(false)
}

async function llamarAchatGpt(mensage) {
  const misdatos = {prompt:mensage}
  const respuesta = await fetch('http://localhost:3100/api/miOpenAI', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',     
    },
    body:  JSON.stringify(misdatos)
  })
  const datos = await respuesta.json()
  return datos.data
}

function crearPrompt(platillo) {
  return `
  Necesito Del siguiente platillo '${platillo}' me daras el pais de origen, los ingredientes de ese platillo junto con la preparación de dicho platillo
  Como respuesta me darás el  Nombre Platillo, Pais Origen, Ingredientes y Preparación, si consideras que el nombre '${platillo}' es poca información puedes completarla para el platillo más similar.
  Es importante que solo me des esa estructura para el platillo que te indique, sin confirmaciones, ni datos adicionales. `
}

function mostrarCarga(esCargando) {
  const divContainer = document.querySelector('.container')
  const btnArmar = document.getElementById('btnArmar')
  if (esCargando) {
    divContainer.innerHTML = ''
    divContainer.style.textAlign = 'center'
    btnArmar.disabled = true
    btnArmar.style.backgroundColor = 'gray'
    btnArmar.style.cursor = 'auto'
    let imagen = document.createElement("img");
    imagen.src = "./img/gif_cargando.gif";
    const parrafo = document.createElement('h3')
    parrafo.innerHTML = 'Cargando...'
    divContainer.appendChild(parrafo);
    divContainer.appendChild(imagen);
  }
  else {
    btnArmar.disabled = false
    btnArmar.style.backgroundColor = '#96B6C5'
    btnArmar.style.cursor = 'pointer'
    divContainer.style.textAlign = 'left'
  }
}