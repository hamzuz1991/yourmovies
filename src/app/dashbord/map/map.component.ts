import { Component, OnInit } from '@angular/core';
declare let L;
import './../../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { element } from '@angular/core/src/render3';

@Component({

  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  i = 0;
  items = [];
  cinema: AngularFireList<any>;
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.cinema = db.list('cinema');


  }

  ngOnInit() {

    this.cinema.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y['$key'] = action.key;
        this.items.push(y as ListCinemaClass);
      });
    });






    const map = L.map('map').setView([33.950, 10.12], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    this.cinema.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y['$key'] = action.key;
        this.items.push(y as ListCinemaClass);


        this.items.forEach(res => {
          new L.marker([res.lat, res.longit])
            .bindPopup(res.name + '<br/>//Adress:' + res.adr)
            .addTo(map);
        });
      });
    });

  }

}





export class ListCinemaClass {
  $key: string;
  Cinemaname: string;
  CinemaAdresse: string;
  CinemaPhone: string;
  CinemaEmail: string;
  CinemaLat: string;
  CinemaLongit: string;
}