import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private toastr:ToastrService,private authservice: AuthService,private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private authFackservice: AuthfakeauthenticationService, ) {

    
     }

  ngOnInit() {
    document.body.setAttribute('class', 'authentication-bg');

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
    //       document.body.removeAttribute('class');
    //       this.router.navigate(['/dashboard']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f.email.value, this.f.password.value)
    //       .pipe(first())
    //       .subscribe(
    //         data => {
    //           this.router.navigate(['/dashboard']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }

        this.authservice.login(this.loginForm.value).subscribe((next:any)=>{
        
          document.body.removeAttribute('class');
      var token=localStorage.getItem('token')
      this.decodedToken = this.jwtHelper.decodeToken(token);
      this.toastr.success('Login Successfully!', 'Congrats', {
        titleClass: "center",
        messageClass: "center"
      });
      console.log(this.decodedToken);
      if(this.decodedToken.role=="Customer"){
        this.router.navigate(['/user']);
      }
      if(this.decodedToken.role=="Admin"){
        this.router.navigate(['/admin']);
      }
   
    }, error => {
        this.toastr.error('Somethings wrong!', 'Sorry!', {
        titleClass: "center",
        messageClass: "center"
      });
      
    });
  }
}
