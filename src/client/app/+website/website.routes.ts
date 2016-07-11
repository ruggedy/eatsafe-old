import { RouterConfig } from '@angular/router';

import { WebsiteComponent, HomeComponent, RegistrationComponent, SignInComponent, SignUpComponent } from './index';
import { AuthGuard, ProfileGuard } from '../shared/index';

export const WebsiteRoutes: RouterConfig = [
    {
        path: '',
        component: WebsiteComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'registration',
                component: RegistrationComponent,
                children: [
                    {
                        path: '',
                        component: SignUpComponent
                    },
                    {
                        path:'signin',
                        component: SignInComponent
                    }
                ]

            }
        ]
        
    }
]