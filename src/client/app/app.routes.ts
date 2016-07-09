import { provideRouter, RouterConfig } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';
import { RestaurantRoutes } from './+restaurant/index';
import { RegistrationRoutes } from './+registration/index';
import { ProfileGuard ,AuthGuard, AuthService, RestaurantService } from './shared/index';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...RegistrationRoutes,
  ...RestaurantRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  [AuthGuard, AuthService, ProfileGuard, RestaurantService]
];
