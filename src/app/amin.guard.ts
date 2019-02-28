import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AdminComponent } from './admin/admin.component';
import { LoginnComponent } from './accueil/loginn/loginn.component';
import { Component, OnInit } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AminGuard implements CanActivate  {
  rep: any;
  constructor(public auth: AngularFireAuth, private router: Router) { this.rep =localStorage.getItem('usera'); console.log(this.rep) }
 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



    if (this.rep ==='false') {
      this.router.navigateByUrl('/loginadin');
      window.location.reload();
      return false; }
else {
  
  return true}
    
    
  }

}

