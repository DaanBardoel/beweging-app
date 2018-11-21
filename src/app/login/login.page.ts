import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(private loginService: LoginService) {
    }

    ngOnInit() {
    }

    public onLogin(username: string, password: string): void {
        try {
            this.loginService.login(username, password);
        } catch (err) {
            console.log(err);
        }
    }
}
