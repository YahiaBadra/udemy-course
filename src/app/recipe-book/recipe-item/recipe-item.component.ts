import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe-book.module';
import { RecipebookService } from '../recipe-book.service';
@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Input() recipe?: Recipe;

  constructor(private recipebookService: RecipebookService) {}

  onSelected() {
    this.recipebookService.recipeSelected.emit(this.recipe);
  }
}
