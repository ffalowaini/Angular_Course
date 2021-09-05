import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { RecipesComponent } from '../recipes/recipes.component';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeSer: RecipeService, private authService: AuthService) { }


  storeRecipes() {
    const recipes = this.recipeSer.getRecipes();
    this.http.put('https://angular-shopping-963b2-default-rtdb.firebaseio.com/recipes.json',
      recipes

    )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://angular-shopping-963b2-default-rtdb.firebaseio.com/recipes.json')
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
        });
      }),
      tap(recipes => {
        this.recipeSer.setRecipes(recipes);

      })
    );


  }
}
