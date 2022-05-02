const firebaseConfig = {
  apiKey: "AIzaSyA0X3cStfEE_7472dc-DUlrX_VfOV8adl4",
  authDomain: "pcbre-0.firebaseapp.com",
  databaseURL: "https://pcbre-0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pcbre-0",
  storageBucket: "pcbre-0.appspot.com",
  messagingSenderId: "821214169913",
  appId: "1:821214169913:web:4dcd3bf17b4ec20e85f6e8"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Base de datos
  var database = firebase.database();
  
  // Escribir
  var referencia = database.ref('/');
  referencia.set({
        actividad: 'jacob',
        fecha: '123',
        usuario: 'hola'
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