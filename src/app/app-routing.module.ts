import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import RecipeBookComponent from './recipe-book/recipe-book.component';

const routes: Routes = [{ path: 'auth', component: AuthComponent },
{path: 'recipes',component : RecipeBookComponent},
{path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
