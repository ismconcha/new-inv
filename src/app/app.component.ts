import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: 'inicio', icon: 'person' },
    { title: 'Lista', url: 'lista', icon: 'list' },
    { title: 'Ingreso', url: 'ingreso', icon: 'enter' },
    { title: 'Retiro', url: 'retiro', icon: 'exit' },
  ];
  constructor() {}
}
