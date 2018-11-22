import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

import {Account} from '../../models/account/account.model';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
    public currentAccount: Observable<Account>;
    private currentAccountSubject: BehaviorSubject<Account>;

    constructor() {
        this.currentAccountSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('currentAccount')));
        this.currentAccount = this.currentAccountSubject.asObservable();
    }

    public get currentAccountValue(): Account {
        return this.currentAccountSubject.value;
    }

}
