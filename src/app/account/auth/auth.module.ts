import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../shared/ui/ui.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { Register } from 'src/app/core/models/register';
import * as mat from '@angular/material';
import { ToastrModule, ToastrService } from 'ngx-toastr';
@NgModule({
  declarations: [LoginComponent, SignupComponent, PasswordresetComponent],
  imports: [
    CommonModule,

    // MatSnackBarModule,
    ReactiveFormsModule,
    NgbAlertModule,
    UIModule,
    mat.MatSnackBarModule,
    AuthRoutingModule,
    ToastrModule.forRoot({
      timeOut: 1000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
        progressBar:true,
        progressAnimation:"increasing"
    
    }),
  ],
  providers:[Register,ToastrService]

})
export class AuthModule { }
