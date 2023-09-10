import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent  implements OnInit {

  @Input() weatherData: any;
  weatherIcon: string = "";

  constructor() { }

  ngOnInit() {
    this.weatherIcon = 'http://openweathermap.org/img/w/' + this.weatherData.weather?.[0].icon + '.png'
  }

}
