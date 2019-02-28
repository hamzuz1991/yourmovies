import { Component, OnInit } from '@angular/core';
import { FilmService } from './../../film.service';
import { template } from '@angular/core/src/render3';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private fs : FilmService) { }
  weather;
  temp;
  ngOnInit() {
    this.fs.getWeather().subscribe(res => {
      console.log(res);
      this.weather = res;
    })
  }

}
