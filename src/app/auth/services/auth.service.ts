import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;
  
  get auth(){
    return {...this._auth}
  }

  constructor(private http: HttpClient) { }

  verificaAuth(): Observable<boolean>{
    if( !localStorage.getItem('token')){
      return of(false);
    }
    return this.http.get<Auth>(this.baseUrl + '/usuarios/1')
      .pipe(
        map(auth => {
          this._auth = auth;
          return true;
        })
      );
  }

  login(){
    return this.http.get<Auth>(this.baseUrl + '/usuarios/1')
      .pipe(
        tap(resp => this._auth = resp),
        tap(resp => localStorage.setItem('token', resp.id))
      );
  }

  logout(){
    this._auth = undefined;
    console.log('LogOut');
    localStorage.removeItem('token');
  }
}
