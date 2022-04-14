/**
 * Base de datos que registra para cada usuario su:
 * - DNI
 * - Año de nacimiento
 * - Número de cuenta
 * - Productos de la compra actual
 * - Descuento (si lo tiene)
 * - Método de pago
 * 
 */
var dataBase = {
  user1: {
    dni: '43461148B',
    year: 2001,
    accountNumber: 'SW30 8347 8910 2823 9283 0192',
    products: [
      {name: 'papas', price: 3.70},
      {name: 'lechuga', price:2.10},
    ],
    paymentMethod: 'Paypal'
  },
  user2: {
    dni: '21940598J',
    year: 2002,
    accountNumber: 'SW30 8347 8910 2823 9283 0192',
    products: [
      {name: 'pan', price: 0.9},
      {name: 'jamon serrano', price: 3.25},
      {name: 'yogur', price: 2.00},
      {name: 'muchitos', price: 1.75}
    ],
    discount: 10,
    paymentMethod: 'Credit'
  },
  user3: {
    dni: '21940598J',
    year: 2002,
    accountNumber: 'SW30 8347 8910 2823 9283 0192',
    products: [
      {name: 'leche', price: 4.80},
      {name: 'galletas', price: 2.30},
      {name: 'agua', price: 1.00},
      {name: 'pizza', price: 5.00}
    ],
    paymentMethod: 'Bitcoin'
  }
}


/**
 * Calcula el coste de una compra de un usuario concreto.
 * @user Usuario a elegir
 * @returns Coste de la compra del usuario elegido
 */
function purchaseCostOf(user) {
  var user = "user" + user;
  var cost = 0;
  dataBase[user].products.forEach(element => {
    cost += element.price;
  });
  if (dataBase[user].discount) {
    cost = cost - (cost*dataBase[user].discount/100)
  }
  return cost;
};

/**
 * Devuelve el valor de una fecha incrementado en un número de dias
 * introducido por parámetro.
 * @days Número de dias a incrementar.
 */
function incrementDate(days) {
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1;
  var year = today.getFullYear();
  if ((today.getDate() + days) > 31) {
    day = (today.getDate() + days) % 31 + 1;
    month = today.getMonth() + 2;
  }
  if (month > 12) {
    month = month % 12 + 1;
    year += 1;
  }
  var date = year+'-'+month+'-'+day;
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  return dateTime;
}

/**
 * Crea una tarjeta en la página que muestra el coste (introducido por
 * parámetro) de la compra de un usuario específico.
 * @cost Coste de la compra a mostrar.
 */
function showImport(cost, user) {
  if (dataBase["user" + user].paymentMethod == "Credit") {
    dateTime = incrementDate(30)
  } else {
    dateTime = incrementDate(0)
  }
  var card = document.getElementById("precio");
  const price = document.createElement('div');
  price.classList.add('card', 'white', 'darken-1', 'card-content');
  price.textContent = "Precio total: " + cost.toFixed(2);
  const payDay = document.createElement('div');
  payDay.classList.add('card', 'white', 'darken-1', 'card-content');
  payDay.textContent = "Fecha de cobro: " + dateTime;
  if (!card.firstElementChild && !card.lastElementChild) {
    card.appendChild(price);
    card.appendChild(payDay);
  } else {
    card.replaceChild(price, card.firstElementChild);
    card.replaceChild(payDay, card.lastElementChild);
  }
}


/**
 * PREGUNTA: El json debe estar en el propio código, inicializando una variable, explica por qué se te exige este requisito.
 * Las bases de datos deben estar almacenadas en un archivo .json de un servidor, al que se accede desde el
 * cliente realizando una petición. El cliente por tanto no es el responsable de almacenar información.
 * Como nosotros no contamos con un servidor, nos vemos obligados a emplear una variable en el código de nuestro
 * script para almacenar dicha información.
 */