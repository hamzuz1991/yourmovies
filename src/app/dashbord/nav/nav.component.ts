import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { GetAllService } from './../../get-all.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  users: Observable<any>;
  constructor(private db : AngularFireDatabase,private fire : AngularFireAuth, private root : Router, private gas : GetAllService) {
    this.users = db.list('User').valueChanges();
   }
  name : string;
  emailL : string;
  imagePath : string;
  ngOnInit() {
    this.emailL = localStorage.getItem('user');
    this.users.subscribe(user =>{
      user.forEach(element => {
        if (element.email == this.emailL ){
        this.name = element.name;
        this.imagePath = element.ImgPath;
        }
      });
    })
  }
  Logout(){
    this.fire.auth.signOut().then(() => {
      this.root.navigateByUrl('');
    })
  }


}
