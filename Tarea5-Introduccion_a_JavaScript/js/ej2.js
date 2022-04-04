/**
 * Inserta en una tarjeta un texto que el usuario introduce por teclado
 */
function sub(){
  texto = document.getElementsByName("titulo")[0].value;
  var card = document.getElementById("card");
  const carta = document.createElement('div');
  carta.classList.add('card', 'white', 'darken-1', 'card-content');
  carta.textContent = "" + texto + "";
  card.appendChild(carta)
};
