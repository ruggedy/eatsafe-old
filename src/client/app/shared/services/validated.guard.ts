import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './index'

@Injectable()
export class ValidatedGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router){}

    canActivate() {
        if (this._authService.isValidated()) {return true;}
        this._router.navigate(['restaurant']);
        return false;
    }
}