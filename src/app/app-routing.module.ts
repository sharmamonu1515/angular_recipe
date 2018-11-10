import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { StartRecipeComponent } from './recipe/start-recipe/start-recipe.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes =  [
	{ path: '', redirectTo: '/recipes', pathMatch: 'full' },
	{ path: 'recipes', component: RecipeComponent, children: [
			{ path: '', component: StartRecipeComponent },
			{ path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
			{ path: ':id', component: RecipeDetailsComponent },
			{ path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
		] 	
	},
	{ path: 'shopping', component: ShoppingListComponent},
	{ path: 'signin', component: SigninComponent},
	{ path: 'signup', component: SignupComponent}
];


@NgModule({

	imports: [
		RouterModule.forRoot( appRoutes )
	],
	exports: [RouterModule],

})                   

export class AppRoutingModule {}