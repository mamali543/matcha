import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface UserSignup {
  username: string;
  email: string;
  password: string;

}

interface UserLogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl= 'http://localhost:5000'
  constructor(private http: HttpClient) { }

  signup(user: UserSignup): Observable<any>
  {
    return this.http.post(`${this.baseUrl}/auth/signup`, user);
  }

  login(user: UserLogin): Observable<any>
  {
    return this.http.post(`${this.baseUrl}/auth/login`, user);
  }

  reset(email: string): Observable<any>
  {
    return this.http.post(`${this.baseUrl}/auth/reset`, email);
  }
}
