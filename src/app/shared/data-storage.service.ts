import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  // post
  storeRecipes() {
    this.http.post(
      'https://recipes-d4c3d-default-rtdb.firebaseio.com/recipes.json',
      {}
    );
  }
  // get
  fetchRecipes() {}
}
