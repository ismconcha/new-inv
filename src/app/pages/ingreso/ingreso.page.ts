import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ListadoService } from 'src/app/services/listado.service';
import { IngresoPageRoutingModule } from './ingreso-routing.module';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {

  producto: any = {
    id: "",
    name: "",
    cantidad: ""
  };

  constructor(private productos: ListadoService, private router:Router,private toast:ToastController) { }


  ngOnInit() {
  }

  ingresar() {
    this.productos.agregaProducto(this.producto.id,this.producto.name,this.producto.cantidad);
    this.presentToast('bottom',"Producto Agregado");
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
