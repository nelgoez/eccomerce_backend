"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Producto = /** @class */ (function () {
    function Producto(nombre, descripcion, codigo, foto, precio, stock) {
        this.id = 0;
        this.timestamp = Date.now();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }
    Producto.prototype.getId = function () {
        return this.id;
    };
    Producto.prototype.setId = function (value) {
        this.id = value;
    };
    Producto.prototype.getTimestamp = function () {
        return this.timestamp;
    };
    Producto.prototype.setTimestamp = function (value) {
        this.timestamp = value;
    };
    Producto.prototype.getFoto = function () {
        return this.foto;
    };
    Producto.prototype.setFoto = function (value) {
        this.foto = value;
    };
    Producto.prototype.getDescripcion = function () {
        return this.descripcion;
    };
    Producto.prototype.setDescripcion = function (value) {
        this.descripcion = value;
    };
    Producto.prototype.getCodigo = function () {
        return this.codigo;
    };
    Producto.prototype.setCodigo = function (value) {
        this.codigo = value;
    };
    Producto.prototype.getNombre = function () {
        return this.nombre;
    };
    Producto.prototype.setNombre = function (value) {
        this.nombre = value;
    };
    Producto.prototype.getPrecio = function () {
        return this.precio;
    };
    Producto.prototype.setPrecio = function (value) {
        this.precio = value;
    };
    Producto.prototype.getStock = function () {
        return this.stock;
    };
    Producto.prototype.setStock = function (value) {
        this.stock = value;
    };
    return Producto;
}());
exports.default = Producto;
