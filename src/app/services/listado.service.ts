import { Injectable } from '@angular/core';
import { ProductosDbService } from './productos-db.service';

@Injectable({
  providedIn: 'root'
})
export class ListadoService {


  constructor(private productos: ProductosDbService) { 
    this.productos.databaseConn();
  }

  obtieneProductos(): Array<any> {
    return this.productos.getAllProducts();
  }

  obtieneProducto(id: string) {
    return this.productos.getProduct(id);
  }

  agregaProducto(id: string, name: string, cantidad: number) {
    this.productos.addItem(id,name,cantidad);
  }

  actualizaProducto(id: string, name: string, cantidad: number) {
    this.productos.updateProduct(id,name,cantidad.toString());
  }

  eliminaProducto(id:string) {
    this.productos.deleteProduct(id);
  }
}
