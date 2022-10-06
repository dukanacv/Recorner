import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = "https://localhost:5001/api/"

  private currentUserSource = new BehaviorSubject<User>(null!)
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post(this.baseUrl + "user/login", model).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem("token", user.token)
          this.currentUserSource.next(user)
        }
      })
    )
  }

  regsiter(model: any) {
    return this.http.post(this.baseUrl + "user/register", model).pipe(
      map((user: any) => {
        if (user) {
          localStorage.setItem("token", user.token)
        }
      })
    )
  }

  logout() {
    localStorage.removeItem("token")
    this.currentUserSource.next(null!)
    this.router.navigateByUrl("/")
  }
}
