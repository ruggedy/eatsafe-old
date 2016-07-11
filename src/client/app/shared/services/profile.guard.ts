import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RestaurantService } from './index'

@Injectable()
export class ProfileGuard implements CanActivate {
    constructor(private _restaurantService: RestaurantService, private _router: Router){}

    canActivate() {
        console.log(this._restaurantService.restaurant);
        if (this._restaurantService.restaurant) {return true;}
        this._router.navigate(['/registration/signin']);
        return false;
    }
}