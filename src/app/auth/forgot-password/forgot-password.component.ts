import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  passwordResetForm:FormGroup

  onSubmit(){
    const newLocal = "your email.";
    console.log(newLocal);
    
  }

}
