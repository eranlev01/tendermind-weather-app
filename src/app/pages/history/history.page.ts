import { weatherHistoryModel } from './model/weatherHistoryModel';
import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather/service/weather-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  constructor(
    private weatherService: WeatherDataService,
    private snackBar: MatSnackBar
  ) {}
  
  weatherHistoryCollection!: weatherHistoryModel[];
  ngOnInit() {
    this.getHistory();
  }

  getHistory() {
    this.weatherService.getWeatherHistoryFromDb().subscribe({
      next: (data) => {
        this.weatherHistoryCollection = [];
        for (let record of data) this.weatherHistoryCollection.push({
          city: record.city,
          temp: record.temp,
          desc: record.desc,
          photoBase64: record.photoBase64,
          dateTaken: record.dateTaken.toDate()
        });
      },
      error: (error: any) => {
        this.snackBar.open(error.message, 'OK', {
          duration: 5000,
        });
      },
    });
  }
}
