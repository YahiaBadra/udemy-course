import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub?: Subscription;
  constructor(private authService: AuthService, private router: Router) {}

  @Output() featureSelected = new EventEmitter<string>();

  ngOnInit(): void {
    // const user = JSON.parse(localStorage.getItem('userData')!);
    // if (user) {
    //   this.isAuthenticated = true;
    // } else {
    //   this.isAuthenticated = false;
    // }
    this.isAuthenticated = true;
    this.userSub = this.authService.user.subscribe((response) => {
      this.isAuthenticated = true;
    });
  }
  onSelect(feature: string) {
    console.log(feature);
    this.featureSelected.emit(feature);
  }

  onLogout() {
    localStorage.removeItem('userData');
    this.ngOnInit();
    this.router.navigate(['auth']);
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
