import { Component, OnInit } from '@angular/core';
import { GetAllService } from './../get-all.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
profile = 0
users : Observable<any>;
  constructor(private gas : GetAllService, private db : AngularFireDatabase) {
    this.users = db.list('User').valueChanges();
   }

  ngOnInit() {
  }

}
