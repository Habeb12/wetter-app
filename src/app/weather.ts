import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_max,precipitation_sum,weathercode&current_weather=true&timezone=Europe%2FBerlin';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching weather data:', error);
        return throwError(() => new Error('Failed to fetch weather data. Please try again later.'));
      })
    );
  }
}
