import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-forecast',
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './forecast.html',
  styleUrls: ['./forecast.scss']
})
export class ForecastComponent implements OnInit {

  weatherData: any;
  days: number[] = [];
  dates: string[] = [];
  temperatures: number[] = [];
  precipitation: number[] = [];
  weatherCodes: number[] = [];
  currentWeatherCode!: number;
  chartData: any[] = [];
  loading = true; // Ladezustand

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeather().subscribe(data => {
      this.weatherData = data;

      // Wetterdaten speichern
      this.dates = data.daily.time;
      this.temperatures = data.daily.temperature_2m_max;
      this.precipitation = data.daily.precipitation_sum;
      this.weatherCodes = data.daily.weathercode;
      this.currentWeatherCode = data.current_weather.weathercode;
      this.days = Array.from(Array(this.dates.length).keys());

      // Diagrammdaten vorbereiten
      this.chartData = [
        {
          name: 'Temperatur (°C)',
          series: this.dates.map((date: string, index: number) => ({
            name: date,
            value: this.temperatures[index]
          }))
        },
        {
          name: 'Niederschlag (mm)',
          series: this.dates.map((date: string, index: number) => ({
            name: date,
            value: this.precipitation[index]
          }))
        }
      ];
      this.loading = false; // Daten fertig geladen
    });
  }

  // Wettercode → Bootstrap-Icon
  getWeatherIconFromCode(code: number): string {
    if (code === 0) return 'bi bi-sun-fill text-warning';                           
    if ([1, 2, 3].includes(code)) return 'bi bi-cloud-sun-fill text-secondary';      
    if ([45, 48].includes(code)) return 'bi bi-cloud-fog-fill text-muted';          
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'bi bi-cloud-rain-fill text-primary'; 
    if (code >= 71 && code <= 77) return 'bi bi-snow text-info';                    
    if (code >= 95 && code <= 99) return 'bi bi-cloud-lightning-rain-fill text-dark'; 
    return 'bi bi-cloud-fill text-secondary';                                      
  }

  // Temperaturfarben
  getTempColor(temp: number): string {
    if (temp >= 25) return '#f28b82'; 
    if (temp >= 15) return '#fbbc04';
    return '#a7c7e7'; 
  }
}
