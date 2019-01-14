import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private router: Router,
    private auth:AuthService
  ) { }

  /*canActivate(): Observable<boolean> |boolean {

    if(this.auth.isAuthenticated()){
      return true;
    }
    this.router.navigate(['login']);
  }*/

  canActivate(): Observable<boolean>|Promise<boolean> |boolean {
    return new Promise(
      (resolve,reject)=>{
        if(this.auth.isAuthenticated()){
          resolve(true);
        }else{
          this.router.navigate(['']);
          resolve(false);
        }
      }
    );
  }



}
