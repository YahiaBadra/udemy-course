import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe-book.module';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(
    private recipeService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipeService
      .fetchRecipes()
      .pipe(
        map((recipes: Recipe[] | undefined) => {
          if (!Array.isArray(recipes)) {
            return []; // Return an empty array if recipes is not an array
          }
          return recipes.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          }));
        })
      )
      .subscribe((response: Recipe[]) => {
        this.recipes = response;
      });
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
