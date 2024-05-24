import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgxLoadingModule } from "ngx-loading";
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

// import { NotificationModalComponent } from '../shared/notification-modal/notification-modal.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    // NotificationModalComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxLoadingModule,
    SharedModule,
    RouterModule,
    FormsModule
  ]
})
export class AuthModule { }
