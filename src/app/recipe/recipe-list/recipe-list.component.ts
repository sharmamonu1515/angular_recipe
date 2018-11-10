import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipesChangedSubscription: Subscription;
	// @Output() recipeWasSelected = new EventEmitter<Recipe>();

	// recipes: Recipe[] = [
	// 						new Recipe('Cake','Cake made today','https://images.pexels.com/photos/353347/pexels-photo-353347.jpeg?auto=compress&cs=tinysrgb&h=350'),
	// 						new Recipe('Cookies','Cookies made today','https://images-gmi-pmc.edge-generalmills.com/e8198dd2-770b-4c7c-a748-ca7538cf48d0.jpg')
  // 					];
  
  recipes: Recipe[];



  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() { 
  this.recipesChangedSubscription =   this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      )
    this.recipes = this.recipeService.getRecipe();
  
  }

  // onRecipeSelected(recipeDetailsData) {
  // 	this.recipeWasSelected.emit(recipeDetailsData);
  // }
  onNewRecipe() {
    this.router.navigate(['new'],{relativeTo: this.route});
  }

  ngOnDestroy() {
    this.recipesChangedSubscription.unsubscribe();
  }
}
