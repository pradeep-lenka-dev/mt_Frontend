import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  users: any[] = [];
  loginError:string | null = null
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        this.users = response;
        localStorage.setItem('userData', JSON.stringify(this.users));
        this.loginForm.reset()
        this.router.navigate(['dashbord'])
        console.log(this.users)
      },
      (error) => {
        this.loginError = "Invalid password!"
        console.error('Error fetching users:', error);
      }
    )

    console.log(this.loginForm.value)

  }
  redirect(params) {
    this.router.navigate([params])

  }

}
