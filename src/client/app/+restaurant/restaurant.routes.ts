import { RouterConfig } from '@angular/router';

import { RestaurantComponent, ProfileCreateComponent, 
        ProfileEditComponent, ProfileShowComponent, 
        MenuCreateComponent, RestaurantHomeComponent,
        MenuShowComponent, MenuEditComponent, SingleMenuShowComponent } from './index';
import { NewAccountGuard, AuthGuard, ProfileGuard, ValidatedGuard } from '../shared/index';

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
                canActivate: [AuthGuard, ProfileGuard, ValidatedGuard]
            },
            {
                path: 'profile/new',
                component: ProfileCreateComponent,
                canActivate: [AuthGuard, NewAccountGuard]
            },
            {
                path: 'profile/edit',
                component: ProfileEditComponent,
                canActivate: [AuthGuard, ProfileGuard, ValidatedGuard]
            },
            {
                path: 'profile',
                component: ProfileShowComponent,
                canActivate: [AuthGuard, ProfileGuard, ValidatedGuard]
            },
            {
                path: 'menu',
                component: MenuShowComponent,
                canActivate: [AuthGuard, ProfileGuard, ValidatedGuard]
                
            },
            {
                path: 'menu/new',
                component: MenuCreateComponent,
                canActivate: [AuthGuard, ProfileGuard, ValidatedGuard]
            },
            {
                path: 'menu/edit',
                component: MenuEditComponent,
                canActivate: [AuthGuard, ProfileGuard, ValidatedGuard]
            },
            {
                path: 'menu/:id',
                component: SingleMenuShowComponent,
                canActivate: [AuthGuard, ProfileGuard, ValidatedGuard]
                
            },
            {
                path: '**',
                redirectTo: '/restaurant/home'
            }
        ]
        
    }
]