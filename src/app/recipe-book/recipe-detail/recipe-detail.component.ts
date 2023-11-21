import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe-book.module';
import { RecipeBookService } from '../recipe-book.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe?: Recipe;
  id?: number;
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeBookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.dataStorageService.getRecipe(this.id).subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
    });
  }
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe?.ingredients!);
  }
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDeleteRecipe() {
    this.dataStorageService.deleteRecipe(this.id!).subscribe((response) => {
      this.router.navigateByUrl('/recipes');
      // console.log('response');
    });
  }
}
