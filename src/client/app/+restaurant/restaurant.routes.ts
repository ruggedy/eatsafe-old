import { RouterConfig } from '@angular/router';

import { RestaurantComponent, ProfileCreateComponent, ProfileEditComponent, ProfileShowComponent, MenuCreateComponent, RestaurantHomeComponent } from './index';
import { AuthGuard, ProfileGuard } from '../shared/index';

export const RestaurantRoutes: RouterConfig = [
    {
        path: 'restaurant',
        component: RestaurantComponent,
        children: [
            {
                path: 'home',
                component: RestaurantHomeComponent
            },
            {
                path: 'profile/new',
                component: ProfileCreateComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'profile/edit',
                component: ProfileEditComponent,
                canActivate: [AuthGuard, ProfileGuard]
            },
            {
                path: 'profile',
                component: ProfileShowComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'menu',
                component: MenuCreateComponent
            }
        ]
        
    }
]