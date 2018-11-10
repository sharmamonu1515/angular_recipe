import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

	@ViewChild('f') shoppingListForm: NgForm; 
	subscription: Subscription;
	editMode: boolean = false;
	editIndex: number;
	editItemInfo: Ingredient;
	// @Output() ingredientCreated = new EventEmitter<Ingredient>();

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
		this.subscription = this.shoppingListService.startedEditing
			.subscribe(
				(index: number) => {
					this.editMode = true;
					this.editIndex = index;
					this.editItemInfo = this.shoppingListService.getIngredient(index); 
					// we get the values from service now we can set these value on the form usign view child local reference
					this.shoppingListForm.setValue({
						name: this.editItemInfo.name,
						ammount: this.editItemInfo.ammount
					});
				}
			);
  }

	// onAddIngredient() {

	// 	this.ingredientCreated.emit(
	// 			 new Ingredient(this.name.nativeElement.value,
	// 	 						this.ammount.nativeElement.value)
	// 			 )			

	// }

	onAddIngredient(form: NgForm) { 
		const value = form.value;
		const newIngredient = new Ingredient(value.name, value.ammount);
		if (this.editMode) {
			this.shoppingListService.updateIngredient(this.editIndex, newIngredient);
		} else {
			this.shoppingListService.addIngredient(newIngredient);
		}
		  form.reset();
		  this.editMode = false;
	}
	// clear up our subscription
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	clearForm() {
		this.shoppingListForm.reset();
	 	this.editMode = false;
	}

	onDelete() {
		this.shoppingListService.deleteIngredient(this.editIndex);
		this.clearForm();
	}

}
