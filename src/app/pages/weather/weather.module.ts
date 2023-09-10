import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeatherPageRoutingModule } from './weather-routing.module';

import { WeatherPage } from './weather.page';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { LucideModule } from 'src/app/ui-modules/lucide/lucide.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherPageRoutingModule,
    LucideModule
  ],
  declarations: [WeatherPage, WeatherCardComponent]
})
export class WeatherPageModule {}
