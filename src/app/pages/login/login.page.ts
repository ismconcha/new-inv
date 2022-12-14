import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user:any = {
    name: "",
    password:""
  }

  constructor(private loginservice: LoginService, private router: Router,private toast: ToastController) { 
    
  }

  ngOnInit() {
  }

  login() {
    this.loginservice.validarUsuario(this.user.name,this.user.password).then((res) => {
      if(res.valueOf()) {
        this.router.navigate(['inicio']);
      }
      else {
        this.presentToast("middle","Usuario o contraseña incorrecta");
      }
    });
  }

  registro() {
     this.loginservice.registrarUsuario(this.user.name,this.user.password);
     this.router.navigate(['inicio']);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom',message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 1500,
      position: position
    });

    await toast.present();
  }

}
