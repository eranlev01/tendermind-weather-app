// weather.page.ts
import { Component, OnInit } from '@angular/core';

import { WeatherDataService } from './service/weather-data.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { weatherHistoryModel } from '../history/model/weatherHistoryModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/auth-guard/services/auth.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  weatherData: any = [];
  weaherHistoryData!: weatherHistoryModel;
  image!: string;
  
  constructor(
    private weatherService: WeatherDataService,
    private snackBar: MatSnackBar,
    public authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.weatherService.getCurrentLocation().then((coords) => {
      this.weatherService
        .getWeatherByCoordinates(coords.latitude, coords.longitude)
        .subscribe(
          (data) => {
            this.weatherData = data;
          },
          (error) => {
            console.error('Error fetching weather data:', error);
          }
        );
    });
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source: CameraSource.Camera,
      resultType: CameraResultType.Base64,
    });
    
    this.image = image.webPath as string;

    if (image) {
      this.weaherHistoryData = {
        city: this.weatherData.name,
        temp: this.weatherData.main?.temp,
        desc: this.weatherData.weather?.[0].description,
        photoBase64: image.base64String as string,
        dateTaken: new Date(),
      };
      // Save the object to Firebase Realtime Database
      this.weatherService
        .saveWeatherHistoryToDb(this.weaherHistoryData)
        .subscribe({
          next: (res) => {
            console.log('Response from db: ', res);
          },
          error: (error: any) => {
            this.snackBar.open(error.message, 'OK', {
              duration: 5000,
            });
          },
        });
    }
  }
  saveWeatherToDb() {
    this.saveWeatherToDb();
  }
}
