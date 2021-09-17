import express from "express";
import path from "path";
import Carrito from "./src/Carrito";
import Producto from "./src/Producto";
import ProductoDB from "./src/ProductoDB";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 8080;

const administrador = true;
const productoDB = new ProductoDB();
const carritoDB = new Carrito();

const productos = express.Router();
const carrito = express.Router();

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/productos", productos);
app.use("/carrito", carrito);

const server = app.listen(PORT, () => {
  console.log(`Initializing server on port: ${PORT}`);
});

server.on("error", (error) => {
  console.error(error);
});

// Middleware controlador de permisos
productos.use((req, res, next) => {
  if (administrador) {
    next();
  } else {
    res.status(401).json({
      error: -1,
      descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada`,
    });
  }
});

productos.get("/listar/:id?", (req, res) => {
  let result = undefined;
  let id = isValid(req.params.id);
  if (id) {
    result = productoDB.getById(id);
    return res
      .status(200)
      .json(
        typeof result !== "undefined"
          ? result
          : { error: "Producto no encontrado" }
      );
  } else {
    result = productoDB.getList();
    return res
      .status(200)
      .json(
        typeof result !== "undefined"
          ? result
          : { error: "Productos no encontrados" }
      );
  }
});

productos.post("/agregar", (req, res) => {
  let producto = new Producto(
    req.body.nombre,
    req.body.descripcion,
    req.body.codigo,
    req.body.foto,
    req.body.precio,
    req.body.stock
  );
  productoDB.guardar(producto);
  // res.redirect("/");
  return res.status(201).json({
    codigo: 1,
    descripcion: `Producto creado`,
  });
});

productos.put("/actualizar/:id", (req, res) => {
  let producto = new Producto(
    req.body.nombre,
    req.body.descripcion,
    req.body.codigo,
    req.body.foto,
    req.body.precio,
    req.body.stock
  );
  let id = isValid(req.params.id);
  if (id) {
    let result = productoDB.actualizar(producto, id);
    res
      .status(200)
      .json(
        typeof result !== "undefined"
          ? result
          : { error: "Producto no encontrado" }
      );
  }
});

productos.delete("/borrar/:id", (req, res) => {
  let id = isValid(req.params.id);
  if (id) {
    let result = productoDB.borrar(id);
    res
      .status(200)
      .json(
        typeof result !== "undefined"
          ? result
          : { error: "Producto no encontrado" }
      );
  }
});

carrito.get("/listar/:id?", (req, res) => {
  let result = undefined;
  let id = isValid(req.params.id);
  if (id) {
    result = carritoDB.getProductosById(id);
    return res
      .status(200)
      .json(
        typeof result !== "undefined"
          ? result
          : { error: "Producto no encontrado" }
      );
  } else {
    result = carritoDB.getProductos();
    return res
      .status(200)
      .json(
        typeof result !== "undefined"
          ? result
          : { error: "Productos no encontrados" }
      );
  }
});

carrito.post("/agregar/:id_producto", (req, res) => {
  let result = undefined;
  let id = isValid(req.params.id_producto);

  if (id) {
    result = productoDB.getById(id);
    if (result) {
      carritoDB.guardar(result);
      return res.status(200).json(result);
    }
  }

  return res
    .status(200)
    .json(
      typeof result !== "undefined"
        ? result
        : { error: "Productos no encontrados" }
    );
});

carrito.delete("/borrar/:id", (req, res) => {
  let id = isValid(req.params.id);
  if (id) {
    let result = carritoDB.borrar(id);
    res
      .status(200)
      .json(
        typeof result !== "undefined"
          ? result
          : { error: "Producto no encontrado" }
      );
  }
});

const isValid = (input: string | undefined) => {
  if (input) {
    let n = parseInt(input);
    if (!isNaN(n)) {
      return n;
    }
  }
  return;
};
