/**
 * Inserta en una tarjeta un texto que el usuario introduce por teclado
 * Revisar innerHTML, creamos una variable con el html de lo que queremo smeter y llamamos a esste
 */
function sub(){
  texto = document.getElementsByName("titulo")[0].value;
  var card = document.getElementById("card");
  const carta = document.createElement('div');
  carta.innerHTML = "  <div class='row'><div class='col s12 m7'><div class='card'><div class='card-image'><img src='./images/icono.jpg'><span class='card-title'></span></div><div class='card-content'><p>" + texto + "</p></div></div></div></div>"
  card.appendChild(carta)
};
