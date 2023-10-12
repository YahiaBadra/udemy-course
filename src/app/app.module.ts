import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import RecipeBookComponent from './recipe-book/recipe-book.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-book/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-book/recipe-item/recipe-item.component';
import { DropdownDirective } from './shared/dropdow.directive';
import { ShoppinglistService } from './shopping-list/shopping-list.service';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { AuthComponent } from './auth/auth.component';
import { LoadingComponent } from './shared/loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    RecipeBookComponent,
    ShoppingEditComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    DropdownDirective,
    AuthComponent,
    LoadingComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [ShoppinglistService],
  bootstrap: [AppComponent],
})
export class AppModule {}
