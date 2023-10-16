import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub?: Subscription;
  constructor(private authService: AuthService) {}

  @Output() featureSelected = new EventEmitter<string>();

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      console.log('IS AUTH: ', this.isAuthenticated);
    });
  }
  onSelect(feature: string) {
    console.log(feature);
    this.featureSelected.emit(feature);
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
