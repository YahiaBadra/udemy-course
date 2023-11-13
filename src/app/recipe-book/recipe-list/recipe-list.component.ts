import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe-book.module';
import { RecipeBookService } from '../recipe-book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes?: Recipe[];
  subscription?: Subscription;
  constructor(
    private recipeBookService: RecipeBookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.subscription = this.recipeBookService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeBookService.getRecipes();
  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
