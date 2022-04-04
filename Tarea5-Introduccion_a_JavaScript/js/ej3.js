/**
 * Muestra como mensaje de alerta la cantidad de párrafos, items de lista y
 * elementos div de la página a la que se le hace referencia.
 */
window.onload = function () {
  var parrafos=document.getElementsByTagName("p");
  var elementosLista=document.getElementsByTagName("li");
  var div=document.getElementsByTagName("div");
  alert("Numero total de parrafos "+parrafos.length + 
  "\nNumero total de elementos de lista "+elementosLista.length + 
  "\nNumero total de div "+div.length);
}

