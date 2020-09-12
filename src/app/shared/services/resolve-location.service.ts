
import {empty as observableEmpty,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';

import { WeatherService } from '../../weather/weather.service';

@Injectable()
export class ResolveLocationService implements Resolve<any> {
  constructor(
    private weatherService: WeatherService,
    private router: Router
  ) { };

  resolve(): Observable<any> { // TODO: I think, It shouldn't be so
    this.weatherService.getWeatherByСurrentLocation()
      .then((city) => {
        this.router.navigate([`/${city}`]);
      })
      .catch(error => console.error(error));

    return observableEmpty();
  }
}
