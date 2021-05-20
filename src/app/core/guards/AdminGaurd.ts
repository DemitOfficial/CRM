import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';




@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    console.log(this.authService.tokendata())
    var role=this.authService.tokendata();
    if (role=="Admin") {
       
        return true;
    }
    this.router.navigate(['/user']);
        return false;
    
    
  }
}
