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

  otp: string = '';
  otpArray: string[] = new Array(6).fill('');
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.otp = input.value.slice(0, 6);
    this.updateOtpArray();
  }
  constructor(private authservice : AuthService,private formBuilder: FormBuilder){
    this.passwordResetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit():void{
    // this.passwordResetForm = new  FormGroup({
    //   email: new FormControl('', [Validators.required, Validators.email])
    // })
    // this.otpForm = new FormGroup({
    //   otp:new FormControl('')
    // })

    
  }

  updateOtpArray(): void {
    this.otpArray = this.otp.split('');
    for (let i = this.otpArray.length; i < 6; i++) {
      this.otpArray.push('');
    }
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

    console.log(this.otp)
  }

}
