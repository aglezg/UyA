function sub(){
  texto = document.getElementsByName("titulo")[0].value;
  var card = document.getElementById("card");
  const carta = document.createElement('div');
  carta.classList.add('card', 'blue-grey', 'darken-1', 'card-content', 'white-text', 'card-title');
  carta.textContent = "" + texto + "";
  card.appendChild(carta)
};


  // <div class="row">
  //   <div class="col s12 m6">
  //     <div class="card blue-grey darken-1">
  //       <div class="card-content white-text">
  //         <span class="card-title">Card Title</span>
  //         <p>I am a very simple card. I am good at containing small bits of information.
  //         I am convenient because I require little markup to use effectively.</p>
  //       </div>
  //       <div class="card-action">
  //         <a href="#">This is a link</a>
  //         <a href="#">This is a link</a>
  //       </div>
  //     </div>
  //   </div>
  // </div>