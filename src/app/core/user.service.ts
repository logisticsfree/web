import { Injectable } from "@angular/core";
import { AuthService, User, Company } from "./auth.service";
import { take, map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class UserService {
    userData: User | Company;

    constructor(private auth: AuthService) {}

    getUser() {
		return this.auth.userData$;
    }

    getCompanyID() {
        return this.auth.userData$.pipe(
            take(1),
            map(user => (user["companyID"] ? user["companyID"] : user.uid))
        );
    }
}
