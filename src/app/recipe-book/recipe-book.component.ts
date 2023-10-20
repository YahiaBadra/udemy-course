import { Component, OnInit } from '@angular/core';
// import { Recipe } from './recipe-book.module';
import { RecipebookService } from './recipe-book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css'],
  providers: [RecipebookService],
})
export default class RecipeBookComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    const userData = JSON.parse(localStorage.getItem('userData')!);
    console.log('USER DATA', userData);
    if (!userData) {
      this.router.navigate(['auth']);
    }
  }
}
