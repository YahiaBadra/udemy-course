import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe-book.module';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe?: Recipe;

  constructor() {}

  ngOnInit(): void {}

  onSelected() {
    // this.recipeBookService.recipeSelected.emit(this.recipe);
  }
}
