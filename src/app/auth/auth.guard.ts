import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

// import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
// import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    // public mAuth: AngularFireAuth,
    // public userService: UserService
    public authService: AuthService
  ) {}

  canActivate() {
    // return true;
    const a = this.authService.getAuthState().pipe(
      take(1),
      map(user => !user)
    );
    console.log(a);
    return a;

    // if (this.userService.getUser()) {
    //   // this.authService.router.
    //   return of(true);
    // } else {
    //   return of(false);
    // }
    // return this.authService.getAuthState().pipe(
    //   take(1),
    //   map(user => !user)
    // );
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //        return this.authService.getAuthState().pipe(
  //         take(1),
  //         tap(user => console.log('guard', user)),
  //         map(user => !!user),

  //       );
  // return new Promise((resolve, reject) => {
  // this.userService.getCurrentUser()
  // .then(user => {
  //   this.router.navigate(['/user']);
  //   return resolve(false);
  // }, err => {
  //   return resolve(true);
  // });
  // this.authService.getAuthState().subscribe(user => {
  //   if (user) {
  //     return resolve(false);
  //   } else {
  //     return resolve(true);
  //   }
  // });
  // });
  // return this.authService.getAuthState().pipe(
  //   take(1),
  //   map(user => !!user),
  //   tap(loggedIn => {
  //     if (loggedIn) {
  //       console.log('access denied');
  //       return true;
  //     }
  //   })
  // );
  // }
}
