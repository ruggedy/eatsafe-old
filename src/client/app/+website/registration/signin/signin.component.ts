import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationFormComponent, AuthService, RegInput} from '../../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'sd-signin',
    templateUrl: 'signin.component.html',
    styleUrls: ['signin.component.css'],
    directives: [RegistrationFormComponent]
})
export class SignInComponent implements OnInit {
    constructor(private _authService: AuthService, private _router: Router) { }
    
    error: boolean = false;
    formActive: boolean = true;
    input:RegInput = new RegInput('Sign In', `Don't Already Have An Account`, 'Sign Up', false, '#', 'Login');

    onCreate(event:any){
        console.log(event.value);
        this._authService.signin(event.value)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.obj);
                    localStorage.setItem('userId', data.userId);
                    this.error = false;
                    this._authService.userStatusCheck(this._authService.isLoggedIn(), this._authService.isValidated(), this._authService.isAdmin());
                    if(this._authService.isAdmin()) {
                        this._router.navigate(['home']);
                        return
                    }
                    if(data.restaurantId) {
                        localStorage.setItem('restaurant', data.restaurantId);
                        if(this._authService.isValidated()) {
                            this._router.navigate(['restaurant', 'home']);
                            return
                        }
                        this._router.navigate(['home']);
                        return 
                    }
                    this._router.navigate(['restaurant', 'profile/new']);
                    return
                },
                error => {
                    if(error) {
                        return this.error = true
                    }
                    return
                }
            );
    }
    ngOnInit() {
     }

}