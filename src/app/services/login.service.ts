import { Injectable } from '@angular/core';
import { UsersDbService } from './users-db.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private users: UsersDbService) { 
    this.users.databaseConn();
  }

  validarUsuario(user: string, password: string){
    return this.users.getUserByName(user).then((res) => {
      if(res.name===user){
        if(res.password===password) {
          
          return true;
        }
      }
      return false;
    });
  }

  registrarUsuario(user: string, password: string) {
    this.users.addItem(user,password);
  }
}

