import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isAuth = false;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submit(form: NgForm) {
    const { email, password } = form.value;
    this.isLoading = true;
    if (!this.isLoginMode) {
      this.authService.register(email, password).subscribe(
        (response) => {
          this.router.navigate(['recipes']);
          this.isAuth = true;
          this.isLoading = false;
        },
        errorMessage => {
          console.log(errorMessage);
          this.error=errorMessage;

          this.isLoading = false;
        }
      );
    } else {
      this.authService.login(email, password).subscribe(
        (response) => {
          this.router.navigate(['recipes']);
          this.isAuth = true;
          this.isLoading = false;
        },
        errorMessage => {
          console.log(errorMessage);
          this.error=errorMessage;
       

          this.isLoading = false;
        }
      );
    }
  }
}
