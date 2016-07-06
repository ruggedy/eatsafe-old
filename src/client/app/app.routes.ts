import { provideRouter, RouterConfig } from '@angular/router';

import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';
import { RestaurantRoutes } from './+restaurant/index';
import { RegistrationRoutes } from './+registration/index';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...RestaurantRoutes,
  ...RegistrationRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
