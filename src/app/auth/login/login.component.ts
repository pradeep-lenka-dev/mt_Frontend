import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NotificationData } from '../../shared/notification-modal/notification-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  users: any[] = [];
<<<<<<< Updated upstream
  loginError:string | null = null
=======
  loading: boolean = false
  modalData : NotificationData;
  showModal = false;
>>>>>>> Stashed changes
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
  this.loading = true
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        this.loading = false
        this.users = response;
        localStorage.setItem('userData', JSON.stringify(this.users));
        this.loginForm.reset()
        this.router.navigate(['dashbord'])
        console.log(this.users)
      },
      (error) => {
<<<<<<< Updated upstream
        this.loginError = "Invalid password!"
=======
        this.loading = false
        this.openNotificationModal('failure')
>>>>>>> Stashed changes
        console.error('Error fetching users:', error);
      }
    )

    console.log(this.loginForm.value)

  }
  redirect(params) {
    this.router.navigate([params])

  }

  togglePassword() {
    const passwordField = document.getElementById("password") as HTMLInputElement;
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
  }

  openNotificationModal(type:'success'|'failure'){
    this.modalData = {
      title : type === 'success'? 'success':'failure',
      message:type === 'success'? 'The operation was success': "this operation is failed",
      type:type

    }
    this.showModal = true;

  }
  closeModal(){
    this.showModal = false;
  }

}
