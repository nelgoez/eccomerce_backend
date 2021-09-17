"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProductoDB = /** @class */ (function () {
    function ProductoDB() {
        this.id = 0;
        this.list = [];
    }
    ProductoDB.prototype.getList = function () {
        return this.list;
    };
    ProductoDB.prototype.getById = function (id) {
        var result;
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element.getId() == id) {
                return (result = element);
            }
        }
        return result;
    };
    ProductoDB.prototype.guardar = function (producto) {
        this.id++;
        producto.setId(this.id);
        this.list.push(producto);
    };
    ProductoDB.prototype.borrar = function (id) {
        var _this = this;
        var result;
        this.list.forEach(function (value, index) {
            if (value.getId() == id) {
                result = value;
                _this.list.splice(index, 1);
                return result;
            }
        });
        return result;
    };
    ProductoDB.prototype.actualizar = function (producto, id) {
        var result;
        this.list.forEach(function (value) {
            if (value.getId() == id) {
                value.setTimestamp(Date.now());
                value.setNombre(producto.getNombre());
                value.setDescripcion(producto.getNombre());
                value.setCodigo(producto.getCodigo());
                value.setFoto(producto.getFoto());
                value.setPrecio(producto.getPrecio());
                value.setStock(producto.getStock());
                result = value;
            }
        });
        return result;
    };
    return ProductoDB;
}());
exports.default = ProductoDB;
