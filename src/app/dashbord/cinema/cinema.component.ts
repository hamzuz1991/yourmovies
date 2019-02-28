import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  cinName ;
  cinEmail;
  cinPhone;
  cinAdr;
  cinLat;
  cinLongit;
  CinData = {
    $key:'',
    name :'',
    email:'',
    phone:'',
    adr:'',
    longit:'',
    lat:''
  }

  filmName;
  filmYear;
  FilmData ={
    $key:'',
    name:'',
    year:''
  }
  
  DayHeure;
  hHeure;
  cinheure;
  filmheure;
  HeureData={
    $key :'',
    DayHeure:'',
    hHeure:'',
    cinheure:'',
    filmheure:''
  }
  LoginAdmin = localStorage.getItem('admin');
  itemArray = [];
  filmArray = [];
  heureArray = [];
  items : AngularFireList<any>; 
  itemsFilm : AngularFireList<any>;
  itemsHeure : AngularFireList<any>;

  howaitem : string;
  howaArray =[];
  itemUser : AngularFireList<any>;
  userArray = [];
  constructor(private db : AngularFireDatabase, private root : Router, private fire : AngularFireAuth) { 
   
    this.items = db.list('cinema');
    this.itemsFilm = db.list('Film');
    this.itemsHeure = db.list('Heure');
    this.itemUser = db.list('User');
    
    this.itemUser.snapshotChanges().subscribe( actions => {
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y['$key']= action.key;
        if (y['email'] == this.LoginAdmin){          
        this.userArray.push(y as ListUserClass);
        }
        if (y['email'] == localStorage.getItem('admin')){
          this.howaArray.push(y as ListUserClass);
          this.howaitem = y['name']
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

    this.itemsFilm.snapshotChanges().subscribe(actions =>{
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y['$key']=action.key;
        this.filmArray.push(y as ListFilmClass);
      })
    })

    this.itemsHeure.snapshotChanges().subscribe(actions =>{
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y['$key']=action.key;
        this.heureArray.push(y as ListHeureClass);
      })
    })


  }
  updateHeure($key){
    this.itemsHeure.set($key, {
      cinema: this.HeureData.cinheure,
      day: this.HeureData.DayHeure,
      film: this.HeureData.filmheure,
      heure:this.HeureData.hHeure 
    })
    this.heureArray =[];
  }
  logout(){
    this.fire.auth.signOut().then(() => {
      localStorage.setItem('userad', "false");
      this.root.navigateByUrl('loginadmin');
    })
  }
  OnUpdateHeure($key){
    for (let value of this.heureArray){
      if (value['$key'] == $key){
        this.HeureData.$key = value['$key'];
        this.HeureData.DayHeure = value['day'];
        this.HeureData.cinheure = value['cinema'];
        this.HeureData.filmheure = value['film'];
        this.HeureData.hHeure = value['heure'];
      }
    }
    console.log(this.HeureData);
  }
  AddHure(){
    let data ={
      cinema : this.cinheure,
      film : this.filmheure,
      day : this.DayHeure,
      heure : this.hHeure
    }
    this.itemsHeure.push(data).then(()=>{
      alert('Add Heure Ok');
    }).catch(even =>{
      alert(even);
    })
  }
  DeleteHeure($key){
    this.itemsHeure.remove($key).then(()=>{
    }).catch(even =>{
      alert(even);
    })
  }
  OnUpdateFilm($key){
    for (let value of this.filmArray){
      if (value['$key'] == $key){
        this.FilmData.$key = value['$key'];
        this.FilmData.name = value['name'];
        this.FilmData.year = value['year'];
      }
    }
    console.log(this.FilmData)
  }
  UpdateFilm($key){
    this.itemsFilm.set($key, {
        name : this.FilmData.name,
        year : this.FilmData.year
    })
    this.filmArray=[];
  }
  DeleteFilm($key){
    this.itemsFilm.remove($key).catch(even =>{
      alert(even)
    })
  }
  AddFilm(){
    let data ={
      name : this.filmName,
      year : this.filmYear
    }
    this.itemsFilm.push(data).then(()=>{
      alert('add Movie Ok')
    }).catch(even =>{
      alert(even)
    })
  }
  onUpdateCin($key){
    for (let value of this.itemArray){
      if (value['$key'] == $key){
        this.CinData.$key = value['$key'];
        this.CinData.name = value['name'];
        this.CinData.email = value['email'];
        this.CinData.phone = value['phone'];
        this.CinData.adr = value['adr'];
        this.CinData.longit = value['longit'];
        this.CinData.lat = value['lat'];
      }
    }
    
  }
  AddCinema(){
    let data ={
      name : this.cinName,
      email : this.cinEmail,
      phone : this.cinPhone,
      adr : this.cinAdr,
      lat : this.cinLat,
      longit : this.cinLongit
    }
    this.items.push(data).then(()=>{
      alert('Ok');
    }).catch(event => {
      alert(event);
    })    
    this.heureArray = [];
    this.root.navigateByUrl('/dashbord/home');
  }
  UpdateCinema($key){
    this.items.set($key, {
      adr : this.CinData.adr,
      email : this.CinData.email,
      lat : this.CinData.lat,
      longit : this.CinData.longit,
      name : this.CinData.name,
      phone : this.CinData.phone
    })
    this.itemArray = [];
  }
  DeletCinema($key){
    this.items.remove($key).then(()=>{
    }).catch(even =>{
      alert(even);
    })
  }

  ngOnInit() {
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
export class ListUserClass{
  $key : string;
  name : string;
  email : string;
  phone : string;
  ImgPath : string;
  imageKey: string ;

}
