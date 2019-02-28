import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { GetAllService } from './../../get-all.service';

@Component({
  selector: 'app-loginn',
  templateUrl: './loginn.component.html',
  styleUrls: ['./loginn.component.css']
})
export class LoginnComponent implements OnInit {

  constructor(private fire : AngularFireAuth, private router : Router, private gas : GetAllService) { }
  pwd : string;
  email : string;
  ngOnInit() {
  }
  MyLogin(){
   
    this.fire.auth.signInWithEmailAndPassword(this.email, this.pwd).then(user => {
      console.log(this.email);
      this.gas.setUser(this.email);
      localStorage.setItem('userad', "false");
     this.router.navigateByUrl('/dashbord/home');
    localStorage.setItem('user',this.email);
    }).catch(event =>{
      alert(event)
    })
  }
}
