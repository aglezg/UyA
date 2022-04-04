$(document).ready(function() {
  alert('Pinchamos');
  console.log('Pinchamos');
  $("p").after("<h3> Total div elements: " );
  return document.getElementsByName('p').length();
});