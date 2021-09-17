import Producto from "./Producto";
import { v4 as uuid } from "uuid";

export default class Carrito {
  private id: string;
  private timestamp: number;
  private productos: Array<Producto>;

  constructor() {
    this.id = uuid();
    this.timestamp = Date.now();
    this.productos = [];
  }

  public getId(): string {
    return this.id;
  }

  public getTimestamp(): number {
    return this.timestamp;
  }

  public setTimestamp(value: number) {
    this.timestamp = value;
  }

  public getProductos(): Producto[] {
    return this.productos;
  }

  public getProductosById(id: number): Producto | undefined {
    let result: Producto | undefined;
    for (let element of this.productos) {
      if (element.getId() == id) {
        return (result = element);
      }
    }
    return result;
  }

  public setProductos(value: Producto[]) {
    this.productos = value;
  }

  public guardar(producto: Producto): void {
    this.productos.push(producto);
  }

  public borrar(id: number): Producto | undefined {
    let result: Producto | undefined;
    this.productos.forEach((value, index) => {
      if (value.getId() == id) {
        result = value;
        this.productos.splice(index, 1);
        return result;
      }
    });
    return result;
  }
}
