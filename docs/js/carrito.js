// sessionStorage.removeItem('articulos')

$("button").click(function() {
  if ($(this).attr("class") == "monitor btn waves-effect blue") {
    var nombre = $(this).val();
    var precio = $(this).attr('precio');
    M.toast({html:'Has agregado ' + nombre + '' , classes: 'blue'});
    var articulos = [nombre, precio]
    if (sessionStorage.getItem('articulos')) {
      var tmp = JSON.parse(sessionStorage.getItem('articulos'))
      for (var i=0; i < tmp.length; i+=2) {
        articulos.push(tmp[i])
        articulos.push(tmp[i+1])
      }
    }
    
    sessionStorage.setItem("articulos", JSON.stringify(articulos));
  }
});

window.onload = function() {
  loadCarrito(true, null);
  $("button").click(function() {
    if ($(this).attr("class") == "carrito btn waves-effect red") {
      var tmp = JSON.parse(sessionStorage.getItem('articulos'))
      var indice = parseInt($(this).attr("id"))
      if (indice == 0) { 
        M.toast({html:'Producto eliminado de la tienda ' + tmp[indice] + '' , classes: 'blue'});
        tmp.splice(indice,2)
      } else {
        M.toast({html:'Producto eliminado de la tienda ' + tmp[(indice*2)] + '' , classes: 'blue'});
        tmp.splice((indice*2),2)
      }

      sessionStorage.setItem('articulos', JSON.stringify(tmp))
      loadCarrito(null, parseInt($(this).attr("id")));
      getConvert('EUR', 'EUR', false);
    }
  });
  getConvert('EUR', 'EUR', false);
};
function loadCarrito(boleano, indice) {
  if (document.getElementById("contenidoCarrito") && sessionStorage.getItem("articulos") ) {
    var carrito = document.getElementById('contenidoCarrito').getElementsByTagName('tbody')[0];
    var storedArray = JSON.parse(sessionStorage.getItem("articulos"));
    if (storedArray) {
      if (boleano == true) {
        for (var i = 0; i < storedArray.length; i+=2) {
          if (storedArray[i] != undefined && storedArray[i+1] != undefined) {
            var row = carrito.insertRow(carrito.rows.length);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = storedArray[i];
            cell2.innerHTML = storedArray[i+1];
            cell3.innerHTML = "<button class='carrito btn waves-effect red' id= "+ i/2  +"> X </button>"
          }

        }
      } else {
        carrito.deleteRow(indice)
        for (var i = indice; i < storedArray.length - 1; i++) {
          var tr = document.getElementById('contenidoCarrito').getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i];
          if (tr) {
            var id = tr.getElementsByTagName('td')[2].getElementsByTagName('button')[0]
            console.log(id)
            id.setAttribute('id', i)
          }
        }
      }
    }
  }
}

function loadPrecioTotal(precio, target) {
  var tagPrecioTotal = document.getElementsByClassName('precioTotal')[0].getElementsByTagName('p')[0]
  if (precio != 0 ) {
    tagPrecioTotal.innerHTML = "<strong>TOTAL: " +precio+ " " +target+ "</strong>"
  } else {
    tagPrecioTotal.innerHTML = "<strong>TOTAL: 0.0 EUR</strong>"
  }
}

function getConvert(source, target, boleano) {
  var cantidad = 0
  var storedArray = JSON.parse(sessionStorage.getItem("articulos"));
  for(var i = 0; i<storedArray.length; i+=2) {
    cantidad += parseInt(storedArray[i+1])
  }
  if (boleano != false) {
    url = `https://api.apilayer.com/fixer/convert?to=${target}&from=${source}&amount=${cantidad}`
    const api = new XMLHttpRequest()
    api.withCredentials = true;
    api.open('GET', url, true)
    api.setRequestHeader("apikey", "HTq97ivD3XhluH6O96FfY17Lfd1NmVwL");
    api.send()

    api.addEventListener("readystatechange", function () {
    	if (this.readyState === this.DONE) {
        let datos = JSON.parse(this.response)
    		loadPrecioTotal(datos.result, target)
    	} else {
        loadPrecioTotal("Error", target)
      }
    });
  } else {
    loadPrecioTotal(cantidad, source)
  }
}