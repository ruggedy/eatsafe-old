import { provideRouter, RouterConfig } from '@angular/router';

import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';
import { RestaurantRoutes } from './+restaurant/index';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...RestaurantRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];
