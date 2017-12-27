import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { User } from '../model/user';
import { USERS } from '../mock-users';
import { LoggerService } from './logger.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {

  private loginUrl = '/login'; // URL to web api
  private signUpUrl = '/usuario/sign-up'; // URL to web api
  private userListUrl = '/usuario/list'; // URL to web api

  constructor(
            private http: HttpClient,
            private loggerService: LoggerService) { }

  /* MOCK login
  login (user: User): boolean {
    if (USERS.indexOf(user) >= 0) {
      return true;
    } else {
      return false;
    }
  }*/

  /** login contra servicio */
  login (user: User): Observable<boolean> {
    this.logDebug('login()');
    return this.http.get<boolean>(
              environment.urlBackend + this.loginUrl
               + '?username=' + user.username
              + '&password=' + user.password)
        .pipe(
          catchError(this.handleError('login', false))
        )
      ;
  }
  
  userList (): Observable<User[]> {
      this.logDebug('userList()');
      return this.http.get<User[]>(
                environment.urlBackend + this.userListUrl)
          .pipe(
            catchError(this.handleError('userList', null))
          )
        ;
    }
  
  signUp (user: User): Observable<void> {
  	this.logDebug('singUp(), '+JSON.stringify(user),);
  	return this.http.post<void>( environment.urlBackend +  this.signUpUrl,
            JSON.stringify(user),
            httpOptions
        ).pipe(
             catchError(this.handleError('signUp', null))
        );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.logError(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private logDebug (message: string) {
    this.loggerService.debug('LoginService: ' + message);
  }

  private logInfo (message: string) {
    this.loggerService.info('LoginService: ' + message);
  }

  private logError (message: string) {
    this.loggerService.error('LoginService: ' + message);
  }

}
