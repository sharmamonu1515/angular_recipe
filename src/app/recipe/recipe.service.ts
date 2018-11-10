import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()

export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

   private recipes: Recipe[] = [
        new Recipe('Cake',
         'Cake made today', 
         'https://images.pexels.com/photos/353347/pexels-photo-353347.jpeg?auto=compress&cs=tinysrgb&h=350',
        [
            new Ingredient('Bread', 10),
            new Ingredient('Cream', 2)
        ]),
        new Recipe('Cookies',
         'Cookies made today',
          'https://beckybakesandbakes.files.wordpress.com/2016/05/jazz4.jpg?w=444&h=296',
        [
            new Ingredient('Maida', 2),
            new Ingredient('Sugar', 250)
        ])
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipes (recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe() {
        return this.recipes.slice();
    }

    addIngredientToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    getRecipeDetails(index: number) {
        return this.recipes.slice()[index];
    }

    addRecipe(newRecipe: Recipe){
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
        return true;
    }
}



// slice is used to send the copy of the array instead of the exact array