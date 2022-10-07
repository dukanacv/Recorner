import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): any {
    return this.userService.currentUser$.pipe(
      map(res => {
        if (res) {
          return true
        }
        this.router.navigate(['user/login'])
        return false
      })
    );
  }

}
