import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

import {LoginResponse} from '../models/login-response.model';
import {LoginRequest} from '../models/login-request.model';
import {Subject} from 'rxjs';

@Injectable()
export class LoginService {

    private tokenReceived = new Subject<string>();
    public tokenReceived$ = this.tokenReceived.asObservable();

    private token: string;
    private username: string;

    constructor(private httpClient: HttpClient) {
    }

    public login(username: string, password: string): void {
        const url = 'http://localhost:8080/login';
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const loginRequest = new LoginRequest(username, password);

        this.httpClient.post<LoginResponse>(url, loginRequest, {headers: headers}).subscribe(
            data => this.onLoggedIn(data),
            err => this.onLoginError(err));
    }

    private onLoggedIn(loginResponse: LoginResponse): void {
        this.token = loginResponse.token;
        this.username = loginResponse.username;

        console.log('We have received a token! ', this.token);
        this.tokenReceived.next(this.token);
    }

    private onLoginError(error: HttpErrorResponse): void {
        this.token = undefined;
        this.username = undefined;

        console.log('An error has occurred ', error.status);
        this.tokenReceived.next(this.token);
    }
}
