"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var Carrito_1 = __importDefault(require("./src/Carrito"));
var Producto_1 = __importDefault(require("./src/Producto"));
var ProductoDB_1 = __importDefault(require("./src/ProductoDB"));
var app = (0, express_1.default)();
var __dirname = path_1.default.resolve();
var PORT = process.env.PORT || 8080;
var administrador = true;
var productoDB = new ProductoDB_1.default();
var carritoDB = new Carrito_1.default();
var productos = express_1.default.Router();
var carrito = express_1.default.Router();
app.use(express_1.default.static(__dirname + "/public"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/productos", productos);
app.use("/carrito", carrito);
var server = app.listen(PORT, function () {
    console.log("Initializing server on port: " + PORT);
});
server.on("error", function (error) {
    console.error(error);
});
// Middleware controlador de permisos
productos.use(function (req, res, next) {
    if (administrador) {
        next();
    }
    else {
        res.status(401).json({
            error: -1,
            descripcion: "ruta " + req.originalUrl + " m\u00E9todo " + req.method + " no autorizada",
        });
    }
});
productos.get("/listar/:id?", function (req, res) {
    var result = undefined;
    var id = isValid(req.params.id);
    if (id) {
        result = productoDB.getById(id);
        return res
            .status(200)
            .json(typeof result !== "undefined"
            ? result
            : { error: "Producto no encontrado" });
    }
    else {
        result = productoDB.getList();
        return res
            .status(200)
            .json(typeof result !== "undefined"
            ? result
            : { error: "Productos no encontrados" });
    }
});
productos.post("/agregar", function (req, res) {
    var producto = new Producto_1.default(req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock);
    productoDB.guardar(producto);
    // res.redirect("/");
    return res.status(201).json({
        codigo: 1,
        descripcion: "Producto creado",
    });
});
productos.put("/actualizar/:id", function (req, res) {
    var producto = new Producto_1.default(req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock);
    var id = isValid(req.params.id);
    if (id) {
        var result = productoDB.actualizar(producto, id);
        res
            .status(200)
            .json(typeof result !== "undefined"
            ? result
            : { error: "Producto no encontrado" });
    }
});
productos.delete("/borrar/:id", function (req, res) {
    var id = isValid(req.params.id);
    if (id) {
        var result = productoDB.borrar(id);
        res
            .status(200)
            .json(typeof result !== "undefined"
            ? result
            : { error: "Producto no encontrado" });
    }
});
carrito.get("/listar/:id?", function (req, res) {
    var result = undefined;
    var id = isValid(req.params.id);
    if (id) {
        result = carritoDB.getProductosById(id);
        return res
            .status(200)
            .json(typeof result !== "undefined"
            ? result
            : { error: "Producto no encontrado" });
    }
    else {
        result = carritoDB.getProductos();
        return res
            .status(200)
            .json(typeof result !== "undefined"
            ? result
            : { error: "Productos no encontrados" });
    }
});
carrito.post("/agregar/:id_producto", function (req, res) {
    var result = undefined;
    var id = isValid(req.params.id_producto);
    if (id) {
        result = productoDB.getById(id);
        if (result) {
            carritoDB.guardar(result);
            return res.status(200).json(result);
        }
    }
    return res
        .status(200)
        .json(typeof result !== "undefined"
        ? result
        : { error: "Productos no encontrados" });
});
carrito.delete("/borrar/:id", function (req, res) {
    var id = isValid(req.params.id);
    if (id) {
        var result = carritoDB.borrar(id);
        res
            .status(200)
            .json(typeof result !== "undefined"
            ? result
            : { error: "Producto no encontrado" });
    }
});
var isValid = function (input) {
    if (input) {
        var n = parseInt(input);
        if (!isNaN(n)) {
            return n;
        }
    }
    return;
};
