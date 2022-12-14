import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class ProductosDbService {

  private dbInstance: SQLiteObject;
  readonly db_name: string = "productos.db";
  readonly db_table: string = "productos";
  prods: Array<any>;

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) {
    this.databaseConn();
  }

  databaseConn() {
      this.sqlite.create({
        name: this.db_name,
        location: 'default'
      }).then((sqLite: SQLiteObject) => {
        this.dbInstance = sqLite;
        sqLite.executeSql(`
              CREATE TABLE IF NOT EXISTS ${this.db_table} (
                id INTEGER PRIMARY KEY, 
                name varchar(255),
                cantidad number
              )`, [])
          .then((res) => {
            // alert(JSON.stringify(res));
          })
          .catch((error) => alert(JSON.stringify(error)));
      })
        .catch((error) => alert(JSON.stringify(error)));
  }

  public addItem(id: string, name: string, cantidad: number) {
    // validation
    if (!id.length || !name.length) {
      alert('Ingrese ID y nombre del producto');
      return;
    }
    this.dbInstance.executeSql(`INSERT INTO ${this.db_table} (id, name, cantidad) VALUES ('${id}', '${name}', ${cantidad})`, [])
      .then(() => {
        this.getAllProducts();
      }, (e) => {
        alert(JSON.stringify(e.err));
      });
  }

  getAllProducts() {
    this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
      this.prods = Array<any>();
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.prods.push(res.rows.item(i));
        }
      }
      
    }, (e) => {
      alert(JSON.stringify(e));
    });
    return this.prods;
  }

  // Get product
  getProduct(id: string): Promise<any> {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE id = ?`, [id])
      .then((res) => {
        return {
          id: res.rows.item(0).id,
          name: res.rows.item(0).name,
          cantidad: res.rows.item(0).cantidad
        }
      });
  }

  // Update
  updateProduct(id: string, name: string, cantidad: string) {
    let data = [name, cantidad];
    return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET name = ?, cantidad = ? WHERE id = ${id}`, data)
  }

  // Delete
  deleteProduct(id: string) {
    this.dbInstance.executeSql(`
  DELETE FROM ${this.db_table} WHERE id = ${id}`, [])
      .then(() => {
        this.getAllProducts();
      })
      .catch(e => {
        alert(JSON.stringify(e))
      });
  }
}
