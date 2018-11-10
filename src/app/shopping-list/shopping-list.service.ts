import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ShoppingListService {

    ingredientChanged = new Subject<Ingredient[]>(); /// this will trigger when user add new ingredient we want to pass the new ingredients
    startedEditing = new Subject<number>(); // this will be used when the user clicked on ingredient to edit that ingredient

    private ingredients: Ingredient[] = [
        new Ingredient('Chocolate', 2),
        new Ingredient('Bread', 5)
    ];

    constructor() {}

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }
    // when added to shopping list
    // addIngredients(ingredients: Ingredient[]) {
    //     for (let ingredient of ingredients){
    //         this.ingredients.push(ingredient);
    //         this.ingredientChanged.emit(this.ingredients.slice());
    //     }
    // }
    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
}