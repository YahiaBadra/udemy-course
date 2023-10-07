import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe-book.module';
import { RecipebookService } from '../recipe-book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe?: Recipe;
  constructor(private recipeService: RecipebookService) {}

  ngOnInit(): void {}
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe!.ingredients);
  }
}
