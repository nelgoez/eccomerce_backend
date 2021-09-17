export default class Producto {
  private id: number;
  private timestamp: number;
  private nombre: string;
  private descripcion: string;
  private codigo: string;
  private foto: string;
  private precio: number;
  private stock: number;

  constructor(
    nombre: string,
    descripcion: string,
    codigo: string,
    foto: string,
    precio: number,
    stock: number
  ) {
    this.id = 0;
    this.timestamp = Date.now();
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.codigo = codigo;
    this.foto = foto;
    this.precio = precio;
    this.stock = stock;
  }

  public getId(): number {
    return this.id;
  }
  
  public setId(value: number) {
    this.id = value;
  }

  public getTimestamp(): number {
    return this.timestamp;
  }
  
  public setTimestamp(value: number) {
    this.timestamp = value;
  }

  public getFoto(): string {
    return this.foto;
  }
  
  public setFoto(value: string) {
    this.foto = value;
  }

  public getDescripcion(): string {
    return this.descripcion;
  }
  
  public setDescripcion(value: string) {
    this.descripcion = value;
  }

  public getCodigo(): string {
    return this.codigo;
  }
  
  public setCodigo(value: string) {
    this.codigo = value;
  }

  public getNombre(): string {
    return this.nombre;
  }
  
  public setNombre(value: string) {
    this.nombre = value;
  }

  public getPrecio(): number {
    return this.precio;
  }
  
  public setPrecio(value: number) {
    this.precio = value;
  }

  public getStock(): number {
    return this.stock;
  }

  public setStock(value: number) {
    this.stock = value;
  }
}
