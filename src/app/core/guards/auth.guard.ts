import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';





@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
    //   var role=this.authService.tokendata();
    //   console.log(role)
    // if (role=="Admin") {
    //     this.router.navigate(['/admin']);
    //     return true;
    // }
    // if (role=="Customer") {
    //     this.router.navigate(['/user']);
    //     return true;
    // }
    return true;
    }
  
    this.router.navigate(['/account/auth/login']);
    return false;
  }
}
