import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe-book.module';
import { RecipebookService } from './recipe-book.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
  providers: [RecipebookService],
})
export default class RecipeBookComponent implements OnInit {
  selectedRecipe?: Recipe;
  constructor() {}

  ngOnInit(): void {}
}

