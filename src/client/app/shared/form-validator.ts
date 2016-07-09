import {FormControl, AbstractControl} from '@angular/forms';
import {Injector, ReflectiveInjector} from '@angular/core';
import { Http, HTTP_PROVIDERS,Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import {AuthService} from './index';

interface IFormValidator {
}

function checkUser(control: FormControl, source: string) : Observable<IFormValidator> {
    let injector = ReflectiveInjector.resolveAndCreate([HTTP_PROVIDERS]);
    let http = injector.get(Http);
    const headers = new Headers({'Content-Type': 'application/json'});
    let maybe = control.valueChanges;
    return new Observable((obs: any) => {
            maybe
            .debounceTime(500)
            .distinctUntilChanged()
            .flatMap(value => http.post('<%=API_DEST%>'+'user/compare', JSON.stringify({[source] : value}), {headers: headers}))
            .subscribe(
                data => {
                    obs.next(null);
                    obs.complete();
                },
                error => {
                    let state = error.json().state;
                    let reason = 'Username is already taken';
                    obs.next({[reason] : !state});
                    obs.complete();
                }
            )
            
    });
}

export class FormValidator {

    static isEmail(control: AbstractControl): {[s: string]: boolean} {
        let EMAIL_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

        let v:string = control.value;

        return EMAIL_REGEX.test(v)? null : {'isEmail': true};
    };

    static checkUsername(control: FormControl) {
        return checkUser(control, 'username');
    }
}