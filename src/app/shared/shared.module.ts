import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { LoadingComponent } from './loading/loading.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    DropdownDirective,
    LoadingComponent,
    AlertComponent,
    PlaceholderDirective,
  ],
})
export class SharedModule {}
