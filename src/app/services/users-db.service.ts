import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx'
import { Platform } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class UsersDbService {

  private dbInstance: SQLiteObject;
  readonly db_name: string = "localusers.db";
  readonly db_table: string = "users";
  USERS: Array<any> = [];

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) {
    this.databaseConn();
  }

  databaseConn() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: this.db_name,
        location: 'default'
      }).then((sqLite: SQLiteObject) => {
        this.dbInstance = sqLite;
        sqLite.executeSql(`
              CREATE TABLE IF NOT EXISTS ${this.db_table} (
                user_id INTEGER PRIMARY KEY, 
                name varchar(255),
                password varchar(255)
              )`, [])
          .then((res) => {
            // alert(JSON.stringify(res));
          })
          .catch((error) => alert(JSON.stringify(error)));
      })
        .catch((error) => alert(JSON.stringify(error)));
    });
  }

  public addItem(n: string, e: string) {
    // validation
    if (!n.length || !e.length) {
      alert('Provide both name & password');
      return;
    }
    this.dbInstance.executeSql(`INSERT INTO ${this.db_table} (name, password) VALUES ('${n}', '${e}')`, [])
      .then(() => {
        this.getAllUsers();
      }, (e) => {
        alert(JSON.stringify(e.err));
      });
  }

  getAllUsers() {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
      this.USERS = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          this.USERS.push(res.rows.item(i));
        }
      }
      return this.USERS;
    }, (e) => {
      alert(JSON.stringify(e));
      
    });
  }

  // Get user
  getUser(id: string): Promise<any> {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE user_id = ?`, [id])
      .then((res) => {
        return {
          user_id: res.rows.item(0).user_id,
          name: res.rows.item(0).name,
          password: res.rows.item(0).password
        }
      });
  }

  getUserByName(name: string): Promise<any> {
    return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE name = ?`, [name])
      .then((res) => {
        return {
          user_id: res.rows.item(0).user_id,
          name: res.rows.item(0).name,
          password: res.rows.item(0).password
        }
      });
  }
  // Update
  updateUser(id: string, name: string, email: string) {
    let data = [name, email];
    return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET name = ?, email = ? WHERE user_id = ${id}`, data)
  }

  // Delete
  deleteUser(user: string) {
    this.dbInstance.executeSql(`
  DELETE FROM ${this.db_table} WHERE user_id = ${user}`, [])
      .then(() => {
        alert("User deleted!");
        this.getAllUsers();
      })
      .catch(e => {
        alert(JSON.stringify(e))
      });
  }
}
