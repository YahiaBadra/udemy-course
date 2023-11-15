import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeBookService } from '../recipe-book/recipe-book.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeBookService
  ) {}

  // post
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipes-d4c3d-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }
  // get
  fetchRecipes() {}
}
