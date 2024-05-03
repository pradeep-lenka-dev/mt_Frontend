import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(public formbuilder:FormBuilder,
              public authservice:AuthService,
              public router:Router
  ){}
  ngOnInit(): void {
    this.signUpForm = this.formbuilder.group({
      fullName:['',Validators.required],
      phoneNumber:[''],
      email:['',Validators.required,Validators.email],
      password:['',Validators.required]
    })
  }


  signUp(){
    let params =  this.signUpForm.value
    this.authservice.signup(params).subscribe(
      (response) => {
        this.router.navigate(['login'])
      },
      (error) => {
        console.log("🚀 ~ SignupComponent ~ signUp ~ error:", error)
        return {
      }
      }
      )
    

  }


}
