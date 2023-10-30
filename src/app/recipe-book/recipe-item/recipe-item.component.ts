import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe-book.module';
import { RecipeBookService } from '../recipe-book.service';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe?: Recipe;

  constructor() {}

  ngOnInit(): void {
    console.log(this.recipe?.id);
  }

  onSelected() {
    // this.recipeBookService.recipeSelected.emit(this.recipe);
  }
}
