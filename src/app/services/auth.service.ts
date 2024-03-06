import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInfo } from '../models/loginInfo';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserInfo } from '../models/userInfo';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private router: Router) {}

  logIn(loginInfo: LoginInfo): Observable<UserInfo> {
    return this.http.post(environment.BASE_URL + 'auth/login', loginInfo).pipe(
      map((userInfo) => {
        this.isUserLoggedIn.next(true);
        return userInfo as UserInfo;
      })
    );
  }

  logOut() {
    this.isUserLoggedIn.next(false);
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  isLoggedIn(): Observable<boolean> {
    if (this.getUserToken()) {
      this.isUserLoggedIn.next(true);
    } else {
      this.isUserLoggedIn.next(false);
    }
    return this.isUserLoggedIn;
  }

  setDataToLocalStorage(userInfo: UserInfo): void {
    localStorage.setItem('token', userInfo.token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  getUserToken() {
    return localStorage.getItem('token');
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('userInfo') || '{}');
  }
}
