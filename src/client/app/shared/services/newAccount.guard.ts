import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './index'

@Injectable()
export class NewAccountGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router){}

    canActivate() {
        if (!this._authService.hasRestaurant()) {return true;}
        this._router.navigate(['restaurant']);
        return false;
    }
}