import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipe-book/recipe-book.module';
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
  addRecipe(recipeId: number, recipe: Recipe) {
    const recipeWithId = { ...recipe, id: recipeId };

    return this.http.put(
      `https://recipes-d4c3d-default-rtdb.firebaseio.com/recipes/${recipeId}.json`,
      recipeWithId
    );
  }

  // get
  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://recipes-d4c3d-default-rtdb.firebaseio.com/recipes.json'
    );
    // .pipe(
    //   map((recipes) => {
    //     return recipes.map((recipe) => {
    //       return {
    //         ...recipe,
    //         ingredients: recipe.ingredients ? recipe.ingredients : [],
    //       };
    //     });
    //   })
    // );
  }
  updateRecipe(recipeId: number, recipe: Recipe) {
    return this.http.put(
      `https://recipes-d4c3d-default-rtdb.firebaseio.com/recipes.json${recipeId}`,
      recipe
    );
  }
}
