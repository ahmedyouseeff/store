import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard {
  constructor(private authService: AuthService, private router: Router) {}

  // Check If the user is logged in
  // If yes he will not be able to nav to the Login Page

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let loggedin: boolean = true;
    this.authService.isLoggedIn().subscribe((res) => {
      loggedin = res;
    });
    if (loggedin) {
      this.router.navigate(['/']);
    }
    return !loggedin;
  }
}
