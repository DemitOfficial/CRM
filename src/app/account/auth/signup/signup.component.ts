import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { Register } from 'src/app/core/models/register';
import { AuthService } from 'src/app/core/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;
  RegisterForm: FormGroup;
  // set the currenr year
  jwtHelper = new JwtHelperService();
  decodedToken: any;
 
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private registermodel:Register,private authservice:AuthService,
    private userService: UserProfileService,private toastr:ToastrService) { }

  ngOnInit() {
    document.body.setAttribute('class', 'authentication-bg');

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.RegisterForm = new FormGroup({
      Name: new FormControl(this.registermodel.UserName),
      Email: new FormControl(this.registermodel.Email),
      Contact:new FormControl(this.registermodel.ContactNo),
      Password: new FormControl(this.registermodel.Password),
      confirmpassword: new FormControl(this.registermodel.confirmpassword)
    })
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.signupForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.register(this.f.email.value, this.f.password.value).then((res: any) => {
    //       this.successmsg = true;
    //       if (this.successmsg) {
    //         document.body.removeAttribute('class');
    //         this.router.navigate(['/dashboard']);
    //       }
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.userService.register(this.signupForm.value)
    //       .pipe(first())
    //       .subscribe(
    //         data => {
    //           this.successmsg = true;
    //           if (this.successmsg) {
    //             this.router.navigate(['/account/login']);
    //           }
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
    debugger;
    this.authservice.register(this.RegisterForm.value).subscribe(next =>{
      this.toastr.success('Register and Login Successfully!', 'Congrats', {
        titleClass: "center",
        messageClass: "center"
      });
 var token=localStorage.getItem('token')
 this.decodedToken = this.jwtHelper.decodeToken(token);
 document.body.removeAttribute('class');
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
    
  debugger;
    
  }
}
