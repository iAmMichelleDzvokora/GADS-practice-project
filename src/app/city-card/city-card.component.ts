import { Component, Input, OnInit } from '@angular/core';

import { Weather } from '../weather/weather';
import { apiConfig } from '../config';
import { Router } from '@angular/router';
import { Forecast } from '../forecast/forecast';
import { ForecastService } from '../forecast/forecast.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-city-card',
  templateUrl: './city-card.component.html',
  styleUrls: ['./city-card.component.scss'],
})
export class CityCardComponent implements OnInit {
  @Input() weather: Weather;
  @Input() unitSystem: string;

  measureOfTemp: string;
  measureOfWindSpeed: string;
  measureOfPressure: string;
  @Input() cityName: string;

  private subscribers: any = {};
  firstWeekForecast: Forecast[];
  isSecondWeekForecastListShow: boolean = false;
  forecastDays: number;

  constructor(
    private router: Router,
    private forecastService: ForecastService
  ) {}

  ngOnInit() {
    const measurementUnits = apiConfig.measurementUnits[this.unitSystem];

    this.measureOfTemp = measurementUnits.temperature;
    this.measureOfWindSpeed = measurementUnits.windSpeed;
    this.measureOfPressure = measurementUnits.pressure;
  }

  ngOnChanges(): void {
    if (this.subscribers.forecast) {
      this.subscribers.forecast.unsubscribe();
    }

    this.subscribers.forecast = this.forecastService
      .getForecastByCity(this.weather.city)
      .subscribe((forecast) => {
        const forecastData = forecast.map((forecastByDay) =>
          this.forecastService.handleResponseForecastData(forecastByDay)
        );

        this.firstWeekForecast = forecastData.slice(0, 7);
        console.log(forecastData);
        this.recalculateForecastDays();
      });
  }

  toggleSecondWeekForecastList(): void {
    this.isSecondWeekForecastListShow = !this.isSecondWeekForecastListShow;

    this.recalculateForecastDays();
  }

  private recalculateForecastDays(): void {
    const firstWeekForecastLength = this.firstWeekForecast.length;

    this.forecastDays = !this.isSecondWeekForecastListShow
      ? firstWeekForecastLength
      : firstWeekForecastLength;
  }

  ngOnDestroy(): void {
    this.subscribers.forecast.unsubscribe();
  }
}
