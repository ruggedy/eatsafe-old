import { RouterConfig } from '@angular/router'

import { AdminComponent } from './index';

export const AdminRoutes: RouterConfig = [

	{
		path: '<%=ADMIN_URL%>', 
		component: AdminComponent
	}
]