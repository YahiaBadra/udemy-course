import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, Response } from './auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  @ViewChild(PlaceholderDirective) alertHost?: PlaceholderDirective;
  private closeSub?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

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
          this.showErrorAlert(errorMessage);
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
  onHandelError() {
    this.error = null;
  }
  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost?.viewContainerRef;
    hostViewContainerRef?.clear();

    const ComponentRef = hostViewContainerRef?.createComponent(alertCmpFactory);
    ComponentRef!.instance.message = message;

    this.closeSub = ComponentRef?.instance.close.subscribe(() => {
      this.closeSub?.unsubscribe();
      hostViewContainerRef?.clear();
    });
  }
}
