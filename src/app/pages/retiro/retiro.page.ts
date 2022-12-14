import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ListadoService } from 'src/app/services/listado.service';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.page.html',
  styleUrls: ['./retiro.page.scss'],
})
export class RetiroPage implements OnInit {

  producto: any = {
    id: "",
    name: "",
    cantidad: ""
  };

  constructor(private productos: ListadoService, private router: Router,private toast: ToastController) { }

  ngOnInit() {
  }

  retiro() {
    this.productos.eliminaProducto(this.producto.id);
    this.presentToast('bottom',"Producto eliminado")
    this.router.navigate(['lista']);
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
