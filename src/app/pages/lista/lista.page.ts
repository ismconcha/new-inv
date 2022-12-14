import { Component, OnInit } from '@angular/core';
import { ListadoService } from 'src/app/services/listado.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {

  prods: Array<any>;

  constructor(private listado: ListadoService) { 
    
  }

  ngOnInit() {
  }

  ionViewDidEnter()  {
    this.prods = this.listado.obtieneProductos();
  }
}
