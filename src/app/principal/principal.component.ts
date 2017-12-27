import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../model/user';
import { LoggerService } from '../services/logger.service';
import { LoginService } from '../services/login.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  private usuarios: User [];
    
  constructor(private router: Router,
          private appComponent: AppComponent,
          private loginService: LoginService,
          private loggerService: LoggerService) {
      
  }

  ngOnInit() {
      if (this.appComponent.user != null) {
          this.loginService.userList().subscribe(
                  usuarios => {
                      this.usuarios = usuarios;
                  }
          );
      } else {
          this.salir();
      }
  }

  salir() {
      this.appComponent.user = null;
      this.router.navigate(['./login']);
  }
}
