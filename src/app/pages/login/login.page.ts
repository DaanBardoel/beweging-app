import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from '../../services/login/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginPage implements OnInit{

    constructor(private loginService: LoginService) {
    }

    ngOnInit() {
    }

    public onLogin(username: string, password: string): void {
        this.loginService.login(username, password);
    }

}
