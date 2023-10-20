import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients?: Ingredient[];
  private igChangeSub?: Subscription;

  constructor(
    private shoppingListService: ShoppinglistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userData')!);
    if (!user) {
      this.router.navigate(['auth']);
    }

    this.ingredients = this.shoppingListService.getIngredients();

    this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (recipes: Ingredient[]) => {
        this.ingredients = recipes;
      }
    );
  }
  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangeSub?.unsubscribe();
  }
}
