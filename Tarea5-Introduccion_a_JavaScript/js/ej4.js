var BaseDeDatos = {
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
    paymentMethod: 'credit card'
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
    paymentMethod: 'bitcoin'
  }
}


i = 1
console.log(BaseDeDatos["user"+i].products[0].name)
console.log(BaseDeDatos["user"+i].products[0].price)
i = 2
console.log(BaseDeDatos["user"+i].year)