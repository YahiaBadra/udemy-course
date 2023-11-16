import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeBookService } from '../recipe-book.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from '../recipe-book.module';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id?: number;
  editMode = false;
  recipeForm: FormGroup;
  recipeIngredients = new FormArray<any>([]);

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeBookService,
    private router: Router,
    private dataStorageService: DataStorageService
  ) {
    this.recipeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      imagePath: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ingredients: new FormControl([]),
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = this.id != null && !isNaN(this.id);

      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id!, this.recipeForm.value);
      this.dataStorageService
        .updateRecipe(this.id!, this.recipeForm.value)
        .subscribe((response) => {
          console.log(response);
        });
    } else {
      this.dataStorageService.fetchRecipes().subscribe((response) => {
        let lengthRecipe = 0;
        if (response !== null) {
          lengthRecipe = response.length;
        }

        this.dataStorageService
          .addRecipe(lengthRecipe, {
            ...this.recipeForm.value,
            id: lengthRecipe,
          })
          .subscribe(() => {
            this.onCancel();
          });
      });
    }
  }

  onAddIngredient() {
    this.recipeIngredients.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id!);
      recipeName = recipe!.name;
      recipeImagePath = recipe!.imagePath;
      recipeDescription = recipe!.description;
      if (recipe!['ingredients']) {
        for (let ingredient of recipe!.ingredients) {
          this.recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: this.recipeIngredients,
    });
  }

  getIngredientControls(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }
}
