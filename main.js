const carrito = [];

const bienvenida = () => {
  alert("¡Bienvenida/o a IF PHOTOGRAPHY Impresiones!");
  comprar();
};


const comprar = () => {
  let productoAComprar = "";
  let seguirComprando = false;

  do {
    productoAComprar = prompt(
      "Estos son nuestros productos: \n\n" +
        listaDeProductos() +
        "\n¿Qué desea imprimir?"
    );

    if (productoAComprar) {
      if (validarProducto(productoAComprar)) {
        let cantidadAComprar = 0;

        do {
          cantidadAComprar = parseInt(prompt("¿Cuántos desea imprimir?"));
        } while (cantidadAComprar <= 0);

        if (cantidadAComprar >= 0) {
          agregarProducto(validarProducto(productoAComprar), cantidadAComprar);
        }

        seguirComprando = confirm("¿Desea agregar otro producto a imprimir?");
      } else {
        alert("Este producto no existe, ingrese un producto válido.");
        seguirComprando = true;
      }
    }
  } while (seguirComprando);

  if (carrito.length) {
    ordernarPrecio();
    if (confirmarCompra()) {
      alert("¡Gracias vuelva prontos!");
    } else {
      alert("Tu compra fue cancelada. Vuelva prontos.");
    }
  } else {
    alert("¡Vuelva prontos!");
  }
};

const confirmarCompra = () => {
  return confirm(
    "Estos son los productos que has agregado a tu carrito: \n\n" +
      listarCarrito() +
      "\n¿Deseas comprar estos productos?"
  );
};

const ordernarPrecio = () => {
  productos.sort((a, b) => a.precio - b.precio);
};

const listarCarrito = () => {
  let listaProductos = "";
  let total = 0;

  carrito.forEach((producto) => {
    listaProductos =
      listaProductos +
      producto.nombre +
      " x " +
      producto.cantidad +
      " = $" +
      producto.precio * producto.cantidad +
      "\n";

    total = total + producto.precio * producto.cantidad;
  });

  listaProductos = listaProductos + "\nEl total es: $" + total;
  return listaProductos;
};

const listaDeProductos = () => {
  let listaProductos = "";

  productos.forEach((producto) => {
    listaProductos =
      listaProductos + producto.nombre + ": $" + producto.precio + "\n";
  });
  return listaProductos;
};

const validarProducto = (productoAComprar) => {
  const producto = productos.find(
    (producto) =>
      producto.nombre.toLowerCase() === productoAComprar.toLowerCase()
  );
  return producto;
};

const agregarProducto = (producto, cantidad) => {
  const productoRepetido = carrito.find((p) => p.id === producto.id);
  if (!productoRepetido) {
    producto.cantidad = producto.cantidad + cantidad;
    carrito.push(producto);
  } else {
    productoRepetido.cantidad = productoRepetido.cantidad + cantidad;
  }
};

bienvenida();