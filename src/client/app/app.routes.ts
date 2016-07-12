import { provideRouter, RouterConfig } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { RestaurantRoutes } from './+restaurant/index';
import { WebsiteRoutes } from './+website/index';
import { ProfileGuard ,AuthGuard, AuthService, RestaurantService, TimeFormatConversion } from './shared/index';

const routes: RouterConfig = [
  ...WebsiteRoutes,
  ...RestaurantRoutes,
  {
        path: '**',
        redirectTo: 'home',
    },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  [AuthGuard, AuthService, ProfileGuard, RestaurantService, TimeFormatConversion]
];
