import { Injectable } from '@angular/core';
import { Recipe } from './recipe-book.module';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable()
export class RecipebookService {
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Hamburger',
      'A hamburger is a sandwich consisting of a cooked meat patty on a bun or roll. You can order a hamburger, fries, and a shake at most fast food restaurants.',
      'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhhbWJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      [new Ingredient('Buns', 10), new Ingredient('Meat', 1)]
    ),
    new Recipe(
      2,
      'Pasta',
      'Italian pasta is a collective name for food made from wheat flour and water. The name refers to the resulting dough (pasta also literally means "dough") of which different shapes are rolled and cut. Pasta is boiled in water and served with a sauce.',
      'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGFzdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      [new Ingredient('Buns', 10), new Ingredient('Meat', 1)]
    ),
    new Recipe(
      3,
      'Oman Pizza',
      'Pizza, dish of Italian origin consisting of a flattened disk of bread dough topped with some combination of olive oil, oregano, tomato, olives, mozzarella or other cheese, and many other ingredients.',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b21hbiUyMHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      [new Ingredient('Buns', 10), new Ingredient('Meat', 1)]
    ),
  ];
  constructor(private slService: ShoppinglistService) {}
  getRecipes() {
    return this.recipes.slice();
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  getRecipe(id: number) {
    return this.recipes.find((recipe) => recipe.id === id);
  }
}
