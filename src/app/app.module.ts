import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeBookService } from './recipe-book/recipe-book.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipesModule } from './recipe-book/recipes.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecipesModule,
    SharedModule,
  ],
  providers: [ShoppingListService, RecipeBookService],
  bootstrap: [AppComponent],
})
export class AppModule {}
