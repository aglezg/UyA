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
    stringAlert = [];
    if (password.length < 8) {
      stringAlert.push('La contraseña debe contener un mínimo de 8 carácteres.');
    }
    if (!(/[a-z]/).test(password)) {
      stringAlert.push('La contraseña debe contener al menos un caracter en minúscula.');
    }
    if (!(/[A-Z]/).test(password)) {
      stringAlert.push('La contraseña debe contener al menos un carácter en mayúscula.');
    }
    if (!(/\d/).test(password)) {
      stringAlert.push('La contraseña debe contener al menos un número');
    }
    if (!checkSpecialCharacters(password)) {
      stringAlert.push('La contraseña debe de contener al menos un carácter especial.');
    }
    if (document.getElementById("password").value != document.getElementById("passwordRepeat").value) {
      stringAlert.push('Las contraseñas deben coincidir.');
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
    if (passwordChecker.length != 0) {
      passwordChecker.forEach(element => M.toast({html: `${element}`, classes: 'red'}));
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
          window.location.replace('./signin.html');
      }).catch((err) => {
        M.toast({html: `${err.message}`, classes: 'orange'});
      });
    }
  }

 function singInForm() {  
  userName = document.getElementById("userName").value;
  password = document.getElementById("password").value;
  reference = database.ref('/usuarios/' + userName);
  reference.once('value', snapshot => {
    if (snapshot.val()) {
      if (password == snapshot.val().password) {
        window.location.replace('./main.html');
      } else {
        M.toast({html: 'Parece que la contraseña que has ingresado no corresponde a ese usuario', classes: 'orange'});
      }
    } else {
      M.toast({html: 'Parece que no has ingresado un usuario válido', classes: 'red'});
    }
  });
 }