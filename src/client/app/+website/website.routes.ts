import { RouterConfig } from '@angular/router';

import { WebsiteComponent, HomeComponent, RegistrationComponent, SignInComponent, SignUpComponent, RedirectComponent } from './index';
import { AuthGuard, ProfileGuard } from '../shared/index';

export const WebsiteRoutes: RouterConfig = [
    {
        path: '',
        redirectTo:'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
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
                    },
                    {
                        path: '**',
                        redirectTo: 'home',
                    }
                ]

            },
            {
                path: 'redirect',
                component: RedirectComponent
            },
            {
                path: '**',
                redirectTo: 'home',
            }
        ]
        
    }
]