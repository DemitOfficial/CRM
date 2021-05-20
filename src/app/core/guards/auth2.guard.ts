import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';





@Injectable({
  providedIn: 'root'
})
export class Auth2Guard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    console.log(this.authService.tokendata())
    var role=this.authService.tokendata();
    if (role=="Admin") {
        this.router.navigate(['/home/admin']);
        return true;
    }
    if (role=="Customer") {
        this.router.navigate(['/home/user']);
        return true;
    }
    else{
        this.router.navigate(['/auth']);
        return false;
    }
    
  }
}
