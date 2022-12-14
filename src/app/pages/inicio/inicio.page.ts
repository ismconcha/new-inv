import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  user: any = {
    name: "ismael",
    status: false,
  }

  constructor() { }

  ngOnInit() {
  }

}
