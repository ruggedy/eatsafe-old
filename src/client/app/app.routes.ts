import { provideRouter, RouterConfig } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { RestaurantRoutes } from './+restaurant/index';
import { WebsiteRoutes } from './+website/index';
import { AdminRoutes } from './+admin/index';
import { NewAccountGuard, ProfileGuard ,AuthGuard, AuthService, RestaurantService, TimeFormatConversion } from './shared/index';

const routes: RouterConfig = [
  ...WebsiteRoutes,
  ...RestaurantRoutes,
  ...AdminRoutes,
  {
        path: '**',
        redirectTo: 'home',
    },
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  [NewAccountGuard, AuthGuard, AuthService, ProfileGuard, RestaurantService, TimeFormatConversion]
];
