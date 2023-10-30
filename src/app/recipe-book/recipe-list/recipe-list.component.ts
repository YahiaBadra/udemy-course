import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe-book.module';
import { RecipeBookService } from '../recipe-book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',                      
})
export class RecipeListComponent implements OnInit {
  recipes?: Recipe[];
  constructor(
    private recipeBookService: RecipeBookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.recipeBookService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeBookService.getRecipes();
  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
