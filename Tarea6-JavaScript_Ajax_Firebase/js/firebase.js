const firebaseConfig = {
    apiKey: "AIzaSyCTFP0GIG1BaMc5J1JdUJX74sW3QZB4LX4",
    authDomain: "mi-primer-proyecto-45c3e.firebaseapp.com",
    databaseURL: "https://mi-primer-proyecto-45c3e-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mi-primer-proyecto-45c3e",
    storageBucket: "mi-primer-proyecto-45c3e.appspot.com",
    messagingSenderId: "370541413472",
    appId: "1:370541413472:web:b136459d1d6cf619f42f05",
    measurementId: "G-ZMLJLYLJL4"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Base de datos
  var database = firebase.database();
  var referencia = database.ref('/');
  referencia.once('value', snapshot => {
    console.log(snapshot.val());
  });
/*
  // Referencia al nodo 'messages', si no existe se crea
  var messages = database.ref('messages');
  // Evento a ejecutar cuando agregen un nuevo elemento al nodo 'messages'
  messages.on('child_added', function(data) {
    $('#messages').append('<li>' + data.val().body + '</li>');
  });

  // Cuando se escribe un mensaje se debe escribir en la base de datos de firebase
  $('form').on('submit', function(e) {
    e.preventDefault();
    messages.push().set({ body: $('#username').val() });
    $('#m').val('');
  });
  */