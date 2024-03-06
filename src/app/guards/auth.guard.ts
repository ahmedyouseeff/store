import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  // Check If the user is logged in
  // If not he will navigate to Login Page

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let loggedin: boolean = false;
    this.authService.isLoggedIn().subscribe((res) => {
      loggedin = res;
    });
    if (!loggedin) {
      this.router.navigate(['/auth']);
    }
    return loggedin;
  }
}
