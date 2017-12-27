import { Component, OnInit } from '@angular/core';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  validado: boolean;
  title = 'LoginApp';
  user: User;

  constructor () {
    this.validado = false;
  }
}
