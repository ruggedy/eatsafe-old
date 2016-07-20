import { Component, OnInit, Input} from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { RestaurantSideBar } from './restaurant-sidebar';
import { RestaurantService, AuthService } from '../../index'

@Component({
    moduleId: module.id,
    selector: 'sd-restaurant-sidebar',
    templateUrl: 'restaurant-sidebar.component.html',
    styleUrls: ['restaurant-sidebar.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class RestaurantSidebarComponent implements OnInit {
    constructor(private _rs: RestaurantService, private _as: AuthService, private _router: Router) { }
    @Input() name: any = null;
    sideBarOptions: RestaurantSideBar[] =[];

    logout(event: any) {
        console.log(event.target);
        if(event.target.id === 'logout') {
            this._as.logout();
            this._router.navigate(['home']);
            return true
        }
        console.log('It breaks');
        return false;
    }

    ngOnInit() {
        let home = new RestaurantSideBar('home', 'fa-home');
        let  menu = new RestaurantSideBar('menu', 'fa-cutlery');
        let  profile = new RestaurantSideBar('profile', 'fa-user');

        this.sideBarOptions.push(home, menu, profile);  
     }

}
