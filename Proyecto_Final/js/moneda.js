function getConvert(source, target) {
  cantidad = document.getElementsByName("cantidadMoneda")[0].value;
  url = `https://api.apilayer.com/fixer/convert?to=${target}&from=${source}&amount=${cantidad}`
  const api = new XMLHttpRequest()
  api.withCredentials = true;
  api.open('GET', url, true)
  api.setRequestHeader("apikey", "HTq97ivD3XhluH6O96FfY17Lfd1NmVwL");
  api.send()

  api.addEventListener("readystatechange", function () {
  	if (this.readyState === this.DONE) {
      let datos = JSON.parse(this.response)
  		showConvert(datos.result, source, target)
  	} else {
      showConvert("Error", source, target)
    }
  });
}

function showConvert(valor, source, target) {
  var card = document.getElementById("cambio");
  const cambio = document.createElement("div");
  cambio.classList.add('card', 'white', 'darken-1', 'card-content');
  cambio.textContent = `Cambio de ${source} a ${target} = > ${valor}`
  if (!card.firstElementChild && !card.lastElementChild) {
    card.appendChild(cambio);
  } else {
    card.replaceChild(cambio, card.firstElementChild);
  }
}