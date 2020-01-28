import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {FirebaseserviceService} from './servicios/firebaseservice.service'
import {Router} from '@angular/router';
import * as firebase from "firebase";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GuardiaGuard implements CanActivate{
  constructor(
    private servicio:FirebaseserviceService,
    private router:Router
    ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.servicio.afAuth.authState.pipe(map(User => {
        if (User) {
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      }));
  }
 
}