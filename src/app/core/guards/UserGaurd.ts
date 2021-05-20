import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';



@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    console.log(this.authService.tokendata())
    var role=this.authService.tokendata();
    if (role=="Customer") {
       
        return true;
    }
    this.router.navigate(['/admin']);
        return false;
    
    
  }
}
