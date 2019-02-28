import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : string;
  phone : string;
  email : string;
  pwd : string;
  items : AngularFireList<any>;
  constructor(public fire : AngularFireAuth, db : AngularFireDatabase, private root : Router) {
    this.items = db.list('User');
   }

  ngOnInit() {
  }
  CreateAccount(){
    let data = {
      name : this.name,
      phone : this.phone,
      email : this.email,
    }
    this.fire.auth.createUserWithEmailAndPassword(this.email, this.pwd).then(user => {
      this.items.push(data);
      alert('Your account has ben created');
      localStorage.setItem('user', this.email)
      this.root.navigateByUrl('/dashbord/home');
    }).catch(event => {
      alert(event);
    })
  }

}
