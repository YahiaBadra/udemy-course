import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients?: Ingredient[];
  private igChangeSub?: Subscription;

  constructor(private shoppingListService: ShoppinglistService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (recipes: Ingredient[]) => {
        this.ingredients = recipes;
      }
    );
  }

  ngOnDestroy(): void {
    this.igChangeSub?.unsubscribe();
  }
}
