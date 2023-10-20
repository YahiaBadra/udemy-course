import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, Response } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userData')!);
    if (user) {
      this.router.navigate(['recipes']);
    }
  }

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
          this.isLoading = false;
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;

          this.isLoading = false;
        }
      );
    } else {
      this.authService.login(email, password).subscribe(
        (response: Response) => {
          localStorage.setItem('userData', JSON.stringify(response));
          const user = JSON.parse(localStorage.getItem('userData')!);
          if (user) {
            this.ngOnInit();
          }

          this.isLoading = false;
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;

          this.isLoading = false;
        }
      );
    }
  }
}
