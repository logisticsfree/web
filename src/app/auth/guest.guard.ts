import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.authService.getAuthState().subscribe(user => {
      if (user) {
        // TODO: solve the issue
        this.router.navigate(['/user']);
        console.log('gues.guard', user);
      }
    });
  }

  canActivate() {
    // if (this.userService.getUser()) {
    //   console.log('not authorized');
    //   return false;
    // } else {
    //   console.log('authorized');
    //   return  true;
    // }
    return this.authService.getAuthState().pipe(
      take(1),
      map(user => !user)
    );
  }
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //       return this.authService.getAuthState().pipe(
  //         take(1),
  //         tap(user => console.log('guest', user)),
  //         map(user => !user),

  //       );
  // }
}
