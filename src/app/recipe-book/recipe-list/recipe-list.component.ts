import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe-book.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes?: Recipe[];
  subscription?: Subscription;
  constructor(
    private recipeService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // this.subscription = this.recipeBookService.recipesChanged.subscribe(
    //   (recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   }
    // );

    this.subscription = this.recipeService.fetchRecipes().subscribe((response) => {
      this.recipes = response;
    });

    // this.recipes = this.recipeBookService.getRecipes();
  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
