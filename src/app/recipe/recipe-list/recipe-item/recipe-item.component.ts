import { Component, 
  OnInit, 
  Input, 
  ViewChild, 
  ElementRef, 
  EventEmitter,
   Output } from '@angular/core';
   
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

	@Input('recipeItemCom') recipe: Recipe;
  @Input('index') index: number;
	// @Output() recipeDetails = new EventEmitter<void>();

	// @ViewChild('recipeName') recipeName : ElementRef;
	// @ViewChild('recipeDesc') recipeDesc: ElementRef;
	// @ViewChild('recipePath') recipePath: ElementRef;

  constructor() { }

  ngOnInit() {

  }


  // onRecipeSelect(){
 
  // 	this.recipeDetails.emit();

  // }

  // onRecipeSelect() {

  //  	this.recipeService.selectedRecipe.emit(this.recipe);

  //  }

}
