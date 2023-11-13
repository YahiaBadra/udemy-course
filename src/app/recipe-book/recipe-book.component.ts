import { Component, OnInit } from '@angular/core';
// import { Recipe } from './recipe-book.module';

import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
  
})
export default class RecipeBookComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      this.router.navigate(['auth']);
    }
  }
}
