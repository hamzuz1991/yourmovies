import { Component, OnInit } from '@angular/core';
import { FilmService } from './../../film.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  constructor(private ApiFilm : FilmService, private root : Router) { }
  
  Imgpath1 : any;
  Imgpath2 : any;
  Imgpath3 : any;
  Imgpath4 : any;
  Imgpath5 : any;
  Imgpath6 : any;
  Imgpath7 : any;
  Imgpath8 : any;
  Imgpath9 : any;

  hezni(Title){
    localStorage.setItem('film', Title)
    this.root.navigateByUrl('dashbord/home')
  }
  ngOnInit() {   
      
      this.ApiFilm.getFilm('What Men Want').subscribe((abc : any) => {
        this.Imgpath1 = abc;
      })    
      this.ApiFilm.getFilm('The Upside').subscribe((abc : any) => {
        this.Imgpath2 = abc;
      })
      this.ApiFilm.getFilm('Glass').subscribe((abc : any) => {
        this.Imgpath3 = abc;
      })
      this.ApiFilm.getFilm('The Prodigy').subscribe((abc : any) => {
        this.Imgpath4 = abc;
      })
      this.ApiFilm.getFilm('Green Book').subscribe((abc : any) => {
        this.Imgpath5 = abc;
      })
      this.ApiFilm.getFilm('Aquaman').subscribe((abc : any) => {
        this.Imgpath6 = abc;
      })
      this.ApiFilm.getFilm('Miss Bala').subscribe((abc : any) => {
        this.Imgpath7 = abc;
      })
      this.ApiFilm.getFilm('They Shall Not Grow Old').subscribe((abc : any) => {
        this.Imgpath8 = abc;
      })
      this.ApiFilm.getFilm('Mary Poppins returns').subscribe((abc : any) => {
        this.Imgpath9 = abc;
      })
    
  }
}
