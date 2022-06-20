import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { tap, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router:Router,
    private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.verificaAuth()
        .pipe(
          tap(estaAuth =>{
            if(!estaAuth){
              this.router.navigate(['./auth/login']);
            }
          })
        );

      // if(this.authService.auth.id){
      //   console.log('Autorizado por el AuthGuard - canActivate');
      //   return true;
      // }
      // console.log('Bloqueado por el AuthGuard - canActivate');
      // return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      return this.authService.verificaAuth()
        .pipe(
          tap(estaAuth =>{
            if(!estaAuth){
              this.router.navigate(['./auth/login']);
            }
          })
        );
     
      // if(this.authService.auth.id){
      //   console.log('Autorizado por el AuthGuard - canLoad');
      //   return true;
      // }
      // console.log('Bloqueado por el AuthGuard - canLoad');
      // return false;
  }
}
