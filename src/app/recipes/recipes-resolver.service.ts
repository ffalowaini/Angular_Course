import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {

    constructor(private dataStorageSer: DataStorageService, private recipeSer: RecipeService) { 

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipes = this.recipeSer.getRecipes();
        if (recipes.length === 0 ){
            return this.dataStorageSer.fetchRecipes();

        }
        else {
            return recipes;
        }
    }
}