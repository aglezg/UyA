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
    if (document.getElementById("password").value != document.getElementById("passwordRepeat").value) {
      stringAlert += '* Las contraseñas deben coincidir.\n';
    }
    return stringAlert;
  }

  function checkRegister(user) {
    return new Promise((resolve, reject) => {
      var userRef = database.ref('/usuarios/' + user);
      userRef.once('value', snapshot => {
        if (snapshot.val()) {
          reject(new Error('El usuario ya está registrado'));
        } else {
          resolve('Bienvenido a PCbre, ' + user);
        }
      });
    });
  }

  function singUpForm() {
    var passwordChecker = checkPassword(document.getElementById("password").value);
    if (passwordChecker) {
      alert(passwordChecker);
    } else {
      var userName = document.getElementById("userName").value;
      var email = document.getElementById("email").value;
      var password = document.getElementById("password").value;
      var genre = [...document.getElementsByName("genre")].filter(genre => genre.checked)[0].value;
      var referencia = database.ref('/usuarios/');
      checkRegister(userName).then((result) => {        
        referencia.update({
          [userName] : {
            "password":password,
            "email": email,
            "genre": genre,
          } 
        });
          alert(result);
          window.location.replace('./signin.html');
      }).catch((err) => {
        alert(err.message);
      });
    }
  }

 function sigInFormFunc() {
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
 }