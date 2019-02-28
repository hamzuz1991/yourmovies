import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

    export class AdminGuard implements CanActivate {
      rep:any;
      constructor(public auth: AngularFireAuth, private router: Router) {
        this.rep=localStorage.getItem('userad');
        console.log(this.rep);
       }
      canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
if (this.rep==='false'){
        this.router.navigateByUrl('/loginadmin');
        window.location.reload();
       return false ;
      }
      else {return true; } 
    }
  }