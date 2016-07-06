import { RouterConfig } from '@angular/router';
import { SignUpComponent, RegistrationComponent, SignInComponent } from './index';

export const RegistrationRoutes: RouterConfig = [
    {
        path: 'registration',
        component: RegistrationComponent,
        children: [
            {
                path: '',
                component: SignUpComponent
            },
            {
                path: 'signin',
                component: SignInComponent
            }
        ]
    }
]