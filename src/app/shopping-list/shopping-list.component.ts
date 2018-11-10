import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient }  from '../shared/ingredient.model';;
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

	// ingredients: Ingredient[] = [
	// 								new Ingredient('Chocolate',2),
	// 								new Ingredient('Bread',5)
  // 							];

  subscription: Subscription;
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription =  this.shoppingListService.ingredientChanged // this will trigger once the user added new inghredient
      .subscribe(
        (ingredient: Ingredient[]) => {
        
          this.ingredients = ingredient;
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // this will trigger when user clicked on the existing item 
  // so it will just pass the index to our service so that we can listen to that service from the shopping-list-edit
  onEditIngredient(index: number) {
    this.shoppingListService.startedEditing.next(index); // so here we emit our index
  }
  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  // }
}
