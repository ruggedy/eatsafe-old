import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RestaurantService } from './index'

@Injectable()
export class ProfileGuard implements CanActivate {
    constructor(private _restaurantService: RestaurantService, private _router: Router){}

    canActivate() {
        if (this._restaurantService.restaurant) {return true;}
        this._router.navigate(['/restaurant']);
        return false;
    }
}