import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  passwordResetForm:FormGroup

  constructor(private authservice : AuthService){}

  onSubmit(){
    const newLocal = "your email.";
    console.log(newLocal);
    
  }
  SendRestpasswordLink(){

    this.authservice.forgetPassword('p').subscribe(
      (Response)=>{

      },
      (error)=>{}
    )

  }

}
