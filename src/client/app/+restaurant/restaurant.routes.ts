import { RouterConfig } from '@angular/router';

import { RestaurantComponent, ProfileCreateComponent, 
        ProfileEditComponent, ProfileShowComponent, 
        MenuCreateComponent, RestaurantHomeComponent,
        MenuShowComponent, MenuEditComponent, SingleMenuShowComponent } from './index';
import { NewAccountGuard, AuthGuard, ProfileGuard } from '../shared/index';

export const RestaurantRoutes: RouterConfig = [
    {
        path: 'restaurant',
        component: RestaurantComponent,
        children: [
            {
                path: '',
                redirectTo: '/restaurant/home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: RestaurantHomeComponent,
                canActivate: [AuthGuard, ProfileGuard]
            },
            {
                path: 'profile/new',
                component: ProfileCreateComponent,
                canActivate: [AuthGuard, NewAccountGuard]
            },
            {
                path: 'profile/edit',
                component: ProfileEditComponent,
                canActivate: [AuthGuard, ProfileGuard]
            },
            {
                path: 'profile',
                component: ProfileShowComponent,
                canActivate: [AuthGuard, ProfileGuard]
            },
            {
                path: 'menu',
                component: MenuShowComponent,
                canActivate: [AuthGuard, ProfileGuard]
                
            },
            {
                path: 'menu/new',
                component: MenuCreateComponent,
                canActivate: [AuthGuard, ProfileGuard]
            },
            {
                path: 'menu/edit',
                component: MenuEditComponent,
                canActivate: [AuthGuard, ProfileGuard]
            },
            {
                path: 'menu/:id',
                component: SingleMenuShowComponent,
                canActivate: [AuthGuard, ProfileGuard]
                
            },
            {
                path: '**',
                redirectTo: '/restaurant/home'
            }
        ]
        
    }
]