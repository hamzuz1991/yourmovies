import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  NomFilm : string;
  constructor(private root : Router) { }

  ngOnInit() {
  }
  SaveFilm(){
    localStorage.setItem('film', this.NomFilm);
    this.root.navigateByUrl('/dashbord/home');
  }
}
