import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService
        .logIn(this.loginForm.value)
        .subscribe((response: any) => {
          this.authService.setDataToLocalStorage(response);
          this.router.navigate(['']);
          this.loading = false;
        });
    } else {
      this.showMessage();
    }
  }

  showMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Username and Password are required',
      life: 5000,
    });
  }
}
