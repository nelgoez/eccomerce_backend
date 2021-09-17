import Producto from "./Producto";

export default class ProductoDB {
  private id: number;
  private list: Array<Producto>;

  constructor() {
    this.id = 0;
    this.list = [];
  }

  public getList(): Array<Producto> {
    return this.list;
  }

  public getById(id: number): Producto | undefined {
    let result: Producto | undefined;
    for (let element of this.list) {
      if (element.getId() == id) {
        return (result = element);
      }
    }
    return result;
  }

  public guardar(producto: Producto): void {
    this.id++;
    producto.setId(this.id);
    this.list.push(producto);
  }

  public borrar(id: number): Producto | undefined {
    let result: Producto | undefined;
    this.list.forEach((value, index) => {
      if (value.getId() == id) {
        result = value;
        this.list.splice(index, 1);
        return result;
      }
    });
    return result;
  }

  public actualizar(producto: Producto, id: number): Producto | undefined {
    let result: Producto | undefined;
    this.list.forEach((value) => {
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
  }
}
