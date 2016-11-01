import { RouterConfig } from '@angular/router'

import { AdminComponent } from './index';
import { AuthGuard, AdminGuard  } from '../shared/index';

export const AdminRoutes: RouterConfig = [

	{
		path: '<%=ADMIN_URL%>', 
		component: AdminComponent,
		canActivate: [AuthGuard, AdminGuard ]
	}
]