import { Injectable } from '@angular/core';

import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {ScolariteService} from './scolarite/scolarite.service';

@Injectable({
  providedIn: 'root'
})
export class GuardScolaritieService implements CanActivate{

  constructor(
    private router: Router,
    private auth:ScolariteService
  ) { }

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
