import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ForecastComponent } from './forecast/forecast';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'forecast', component: ForecastComponent }
];
