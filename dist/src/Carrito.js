"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Carrito = /** @class */ (function () {
    function Carrito() {
        this.id = (0, uuid_1.v4)();
        this.timestamp = Date.now();
        this.productos = [];
    }
    Carrito.prototype.getId = function () {
        return this.id;
    };
    Carrito.prototype.getTimestamp = function () {
        return this.timestamp;
    };
    Carrito.prototype.setTimestamp = function (value) {
        this.timestamp = value;
    };
    Carrito.prototype.getProductos = function () {
        return this.productos;
    };
    Carrito.prototype.getProductosById = function (id) {
        var result;
        for (var _i = 0, _a = this.productos; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.getId() == id) {
                return (result = element);
            }
        }
        return result;
    };
    Carrito.prototype.setProductos = function (value) {
        this.productos = value;
    };
    Carrito.prototype.guardar = function (producto) {
        this.productos.push(producto);
    };
    Carrito.prototype.borrar = function (id) {
        var _this = this;
        var result;
        this.productos.forEach(function (value, index) {
            if (value.getId() == id) {
                result = value;
                _this.productos.splice(index, 1);
                return result;
            }
        });
        return result;
    };
    return Carrito;
}());
exports.default = Carrito;
