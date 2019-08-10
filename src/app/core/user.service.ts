import { Injectable } from '@angular/core';
import { AuthService, User, Company } from './auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userData: User | Company;

    constructor(private auth: AuthService) { }

    getUser() {
        return this.auth.userData$;
    }

    getCompanyID() {
        return this.auth.userData$.pipe(
            map(user => {
                if (user) {
                    if (user['companyID']) {
                        return user['companyID'];
                    } else if (user.uid) {
                        return user.uid;
                    }
                } else {
                    return null;
                }
            })
        );
    }
}
