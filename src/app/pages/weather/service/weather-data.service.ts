import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import { Observable, catchError, from, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { weatherHistoryModel } from '../../history/model/weatherHistoryModel'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseError } from '@angular/fire/app';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  private openWeatherApiKey = environment.openWeather.apiKey;
  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  async getCurrentLocation(): Promise<any> {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords;
  }

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.openWeatherApiKey}`;
    return this.http.get(apiUrl).pipe(
      catchError((error: any) => {
        console.error('An error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  saveWeatherHistoryToDb(weatherHistoryData: weatherHistoryModel): Observable<any> {
    return from(
      this.firestore.collection('weatherHistory').add(weatherHistoryData)
    ).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => error)
      )
    );

  }

  getWeatherHistoryFromDb(): Observable<any> {
    return from(
      this.firestore.collection('weatherHistory').valueChanges()
    ).pipe(
      catchError((error: FirebaseError) =>
        throwError(() => error)
      )
    );

  }
}
