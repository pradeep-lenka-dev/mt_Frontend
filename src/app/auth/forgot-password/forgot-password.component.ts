import { Component ,OnInit} from '@angular/core';
import { FormGroup, Validators,FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent implements OnInit{

  passwordResetForm: FormGroup;
  otpForm : FormGroup;

  isOtp:boolean = false;


  constructor(private authservice : AuthService,private formBuilder: FormBuilder){}

  ngOnInit():void{
    this.passwordResetForm = new  FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    })
    this.otpForm = new FormGroup({
      otp:new FormControl('')
    })
  }

  onSubmit(){
    const newLocal = "your email.";
    console.log(newLocal);
  }
  SendRestpasswordLink(): void {
    if (this.passwordResetForm.valid) {
      this.isOtp = true
      console.log('Sending password reset link to:', this.passwordResetForm.value.email);
    } else {
      console.log('Form is invalid');
    }
  }

  verifyOtp(){

  }

}
