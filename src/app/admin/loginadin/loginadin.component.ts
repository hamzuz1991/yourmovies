import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-loginadin',
  templateUrl: './loginadin.component.html',
  styleUrls: ['./loginadin.component.css']
})
export class LoginadinComponent implements OnInit {
  aleralert : any ;
  pdw: string;
  email: string;
  usert: Observable<any>;
  users: AngularFireList<any>;
  constructor(public afAuth: AngularFireAuth, private router: Router, public db: AngularFireDatabase) {
    this.users = db.list('User');
    this.usert = this.users.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }
 
  ngOnInit() {
  }
  SignIn() {
    var i = 0;  
    return this.afAuth.auth.signInWithEmailAndPassword(this.email, this.pdw).then(user => {
      this.usert.forEach(elem => {
        elem.forEach(item => {
          if ((item.email) == this.email && (item.admin == true)){
            this.aleralert = 'true';
            localStorage.setItem('userad', "true")
             this.router.navigateByUrl('/admin');
             
          }
          else {
            this.aleralert = 'true';
            console.log('ghalet')
          }
        })
      }) 
      console.log("hani houni")
      console.log(this.aleralert)
          
        }).catch((error) => {
          alert(error.message)
        })
        
      }

}
