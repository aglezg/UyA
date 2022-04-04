function insertTextInCard() {
  var card = document.getElementById("card");
  var text = document.createTextNode("Añadimos este texto de prueba");
  card.appendChild(text);
}