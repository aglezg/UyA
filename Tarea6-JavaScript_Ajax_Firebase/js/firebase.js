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

  function checkSpecialCharacters(string) {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (format.test(string)) return true
    else return false;
  }
 
  function checkPassword(password) {
    stringAlert = '';
    if (password.length < 8) {
      stringAlert = '* La contraseña debe contener un mínimo de 8 carácteres.\n'
    }
    if (!(/[a-z]/).test(password)) {
      stringAlert += '* La contraseña debe contener al menos un caracter en minúscula.\n'
    }
    if (!(/[A-Z]/).test(password)) {
      stringAlert += '* La contraseña debe contener al menos un carácter en mayúscula.\n';
    }
    if (!(/\d/).test(password)) {
      stringAlert += '* La contraseña debe contener al menos un número\n';
    }
    if (!checkSpecialCharacters(password)) {
      stringAlert += '* La contraseña debe de contener al menos un carácter especial.\n';
    }
    return stringAlert;
  }

  function checkLogin() {
    stringAlert = '';
    if (document.getElementById("userName").value.length <= 0) {
      stringAlert = '* El campo de nombre de usuario no puede estar vacío.\n';
    }
    if (document.getElementById("password").value.length <= 0) {
      stringAlert += '* El campo de contraseña no puede estar vacío.\n';
    }
    return stringAlert;
  }

  function checkEmail(email) {
    var stringEmail = ["@gmail.com", "@gmail.es", "@hotmail.es", "@hotmail.com", "@outlook.es", "@outlook.com", "@ull.edu.es"]
    var status = false;
    for(i = 0; i < stringEmail.length; i++) {
      if (email.includes(stringEmail[i])) {
        status = true;
      }
    }
    return status;
  }

  function checkRegister() {
    stringAlert = '';
    var checks = [...document.getElementsByName("CheckBox")].filter(check => check.value == "must");
    if (document.getElementById("userName").value.length <= 0) {
      stringAlert = '* El campo de nombre de usuario no puede estar vacío.\n';
    }
    if (document.getElementById("password").value.length <= 0) {
      stringAlert += '* El campo de contraseña no puede estar vacío.\n';
    }
    if (document.getElementById("email").value.length <= 0) {
      stringAlert += '* El campo de e-mail no puede estar vacío.\n'
    }
    if (!checkEmail(document.getElementById("email").value)) {
      stringAlert += '* El e-mail introducido no es válido.\n';
    }
    stringAlert += checkPassword(document.getElementById("password").value);
    if (document.getElementById("password").value != document.getElementById("passwordRepeat").value) {
      stringAlert += '* Las contraseñas deben coincidir.\n';
    }
    if ([...document.getElementsByName("genre")].filter(genre => genre.checked).length == 0) {
      stringAlert += '* Se debe seleccionar un género.\n';
    }
    if (checks.filter(check => check.checked).length != checks.length) {
      stringAlert += '* Todos los campos obligatorios deben rellenarse.\n'
    }
    return stringAlert;
  }

  $("#sing_up").click(function() {
    if (checkRegister() == '') {
      var userName = document.getElementById("userName").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var genre = [...document.getElementsByName("genre")].filter(genre => genre.checked)[0].value;
      var referencia = database.ref('/usuarios/');
      referencia.update({
        [userName] : {
          "password":password,
          "email": email,
          "genre": genre,
        } 
      });
        window.location.replace('./signin.html');
        alert("Se ha creado correctamente la cuenta")
    } else {
      alert(checkRegister());
    }
  })

  $("#sign_in").click(function() {
    if (checkLogin() == '') {
      userName = document.getElementById("userName").value;
      password = document.getElementById("password").value;
      reference = database.ref('/usuarios/' + userName);
      reference.once('value', snapshot => {
        if (snapshot.val()) {
          if (password == snapshot.val().password) {
            window.location.replace('./main.html');
            alert("Bienvenido a PCbre, "+ userName);
          } else {
            alert("Parece que la contraseña que has ingresado no corresponde a ese usuario")
          }
        } else {
          alert("Parece que no has ingresado un usuario válido")
        }
      });
    } else {
      alert(checkLogin());
    }
  })