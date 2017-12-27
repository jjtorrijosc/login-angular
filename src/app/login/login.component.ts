import { Component, OnInit, Input } from '@angular/core';

import { User } from '../model/user';
import { LoggerService } from '../services/logger.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  validado: boolean;
  altaRealizada: boolean;
  user: User;
  //@Input() user: User;

  constructor(private router: Router,
          private appComponent: AppComponent,
          private loginService: LoginService,
          private loggerService: LoggerService) {
    this.validado = false;
    this.altaRealizada = false;
    this.user = new User();
  }


  login () {
//    this.validado = !this.validado;
    // this.validado = this.loginService.login(this.user);
    this.loginService.login(this.user).subscribe(
      data => {
        this.validado = data;
        if (data == true) {
            this.appComponent.user = this.user;
            this.router.navigate(['./principal']);
        }
      });
  }
  
  singUp () {
  	this.loginService.signUp(this.user).subscribe(
  	   resp => {
  	      this.altaRealizada = true;
  	      this.validado = true;
  	      this.appComponent.user = this.user;
  	      this.router.navigate(['./principal']);
      }
    );
  }

}
