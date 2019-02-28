import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, observable } from 'rxjs';
import { Router } from '@angular/router';
import { FilmService } from './../../film.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  SearchTitle = localStorage.getItem('film');
  Fapi;

  FilmExist : boolean;


  $keyFilm;
  $keyCinema;
  cinName ;
  cinPhone;
  cinAdr;
  itemArray = [];
  filmArray = [];
  heureArray = [];
  heureList : Observable<any>;
  heureItems : AngularFireList<any>;
  items : AngularFireList<any>;
  FilmItems : AngularFireList<any>;
  filmList : Observable<any>;
  constructor(private db : AngularFireDatabase, private root : Router, private fs : FilmService) {
    this.items = db.list('cinema');
    this.FilmItems = db.list('Film');
    this.filmList = db.list('Film').valueChanges();
    this.heureItems = db.list('Heure');
    this.heureList = db.list('Heure').valueChanges();

    this.heureItems.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y['$key'] = action.key;
        this.heureArray.push(y as ListHeureClass)
      })
    })
    this.FilmItems.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y['$key'] = action.key;
        this.filmArray.push(y as ListFilmClass)
        if (y['name'] == this.Fapi.Title){
          this.filmExId = y['$key'];
        }
      })
    })
    this.items.snapshotChanges().subscribe(actions =>{
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y['$key']=action.key;
        this.itemArray.push(y as ListCinemaClass);
      })
    })
   }
FilmId:any;

  AFOK = false;
  changeAFOK(){
    this.AFOK = !this.AFOK;
  }

  filmExId;
 GetFilmExit(a :string){
  console.log(a);
 this.heureList.subscribe(res => {
     res.forEach(elem => {
       if (elem.film == a){
         console.log(a);          
         this.FilmExist = true;              
       }
     })
   })
 }
 heureheure = [];
 filmtitle;
  ngOnInit() { 
    this.fs.getFilm(this.SearchTitle).subscribe(kk => {
      this.Fapi = kk;
      this.GetFilmExit(kk['Title']);
      this.filmtitle = kk['Title'];
   })


   
  }

}
export class ListCinemaClass{
  $key : string;
  Cinemaname : string;
  CinemaAdresse : string;
  CinemaPhone : string;
  CinemaEmail : string;
  CinemaLat : string;
  CinemaLongit : string;
}
export class ListFilmClass{
  $key : string;
  name : string;
  year : string;
}
export class ListHeureClass{
  $key : string;
  cinema : string;
  film : string;
  heure : string;
  day : string;
}
