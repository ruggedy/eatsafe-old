import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import { Config, NameListService, DataFormatConversion, 
  TimeFormatConversion, AuthService, AuthGuard  } from './shared/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  viewProviders: [NameListService, HTTP_PROVIDERS, AuthService],
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
  constructor() {
  }
}
