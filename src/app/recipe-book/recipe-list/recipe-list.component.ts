import { Component,OnInit } from '@angular/core';
import { Recipe } from '../recipe-book.module';
import { RecipebookService } from '../recipe-book.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {

  recipes?: Recipe[]  ;
    constructor(private recipebookService:RecipebookService){

    }
  ngOnInit(): void {
    this.recipes=this.recipebookService.getRecipes();
  }
  
}