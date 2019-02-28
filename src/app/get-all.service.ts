import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class GetAllService {
  email: string;
  affiche;
  constructor(private fire : AngularFireAuth, private db : AngularFireDatabase) { }
  setUser(f){    
    this.email = f;    
  }
  getUser(){
    return this.email;
  }
  setAffiche(f){
    this.affiche = f; 
    console.log(this.affiche);
  }
  getAffiche(){
    return this.affiche;
  }
}
