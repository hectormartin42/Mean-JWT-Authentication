import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IUser } from '../interfaces/user';
import { ILogin } from '../interfaces/login';
import { JwtHelperService } from '@auth0/angular-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService {

  private header: Headers;
  private toke: string;

  constructor(private http: Http, private jwtHelperService: JwtHelperService) {
    this.header = new Headers();
    this.header.append('Content-Type', 'application/json');
  }

  registerUser(user: IUser) {
    return this.http.post('http://localhost:3000/users/register', user, { headers: this.header })
      .map(res => res.json());
  }

  authenticateUser(user: ILogin) {
    return this.http.post('http://localhost:3000/users/authenticate', user, { headers: this.header })
      .map(res => res.json());
  }

  getProfile () {
    const token =  this.jwtHelperService.tokenGetter();
    this.header.append('Authorization', token);
    return this.http.get('http://localhost:3000/users/profile', { headers: this.header })
      .map(res => res.json());
  }

  storeUserData(user: string, toke: string) {
    localStorage.setItem('token', toke);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.clear();
  }

  isUserLoggedin() {
    const token: string = this.jwtHelperService.tokenGetter();
    if (!token) {return false; }
    return !this.jwtHelperService.isTokenExpired(token);
  }
}
