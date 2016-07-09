import { RouterConfig } from '@angular/router';

import { RestaurantComponent, ProfileCreateComponent, ProfileEditComponent } from './index';
import { AuthGuard, ProfileGuard } from '../shared/index';

export const RestaurantRoutes: RouterConfig = [
    {
        path: 'restaurant',
        component: RestaurantComponent,
        children: [
            {
                path: '',
                component: ProfileCreateComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'edit',
                component: ProfileEditComponent,
                canActivate: [AuthGuard, ProfileGuard]
            }
        ]
        
    }
]