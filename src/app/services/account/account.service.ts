import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {RegisterRequest} from '../../models/register-request/register-request.model';
import {RegisterResponse} from '../../models/register-response/register-response.model';
import {Account} from '../../models/account/account.model';
import {AlertService} from '../alert/alert.service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AccountService {

    private dataReceived = new Subject<string>();
    public dataReceived$ = this.dataReceived.asObservable();

    public successfullyRegistered = false;

    constructor(
        private httpClient: HttpClient,
        private alertService: AlertService,
        private router: Router
    ) {
    }

    public register(account: Account): void {
        this.successfullyRegistered = false;
        const url = 'http://localhost:8080/register';
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        const registerRequest = new RegisterRequest(
            account.email,
            account.username,
            account.password,
            account.gender,
            account.age,
            account.town,
            account.district
        );

        this.httpClient.post<RegisterResponse>(url, registerRequest, {headers: headers}).subscribe(
            data => this.onRegistered(data),
            err => this.onRegisterError(err));
    }

    public onRegistered(registerResponse: RegisterResponse): void {
        console.log('Successfully registrered', registerResponse);
        this.successfullyRegistered = true;
        this.alertService.success('Registratie is gelukt', true);
        this.router.navigate(['/login']);
        this.dataReceived.next();
    }

    public onRegisterError(error: HttpErrorResponse): void {
        console.log('Register failed', error);
        this.successfullyRegistered = false;
        this.dataReceived.next();
    }
}