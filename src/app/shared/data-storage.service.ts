import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RecipeService } from "../recipe/recipe.service";
import { Recipe } from "../recipe/recipe.model";
import { AuthService } from "../auth/auth.service";


@Injectable()

export class DataStorageService {
    constructor(private httpClient: HttpClient, 
        private recipeService: RecipeService,
        private authService: AuthService) {}

    private headers = new HttpHeaders( {'Content-Type': 'application/x-www-form-urlencoded'} );
  
    storeRecipe()
    {
        const token = this.authService.getToken();
        return this.httpClient.put('https://angularproject-e129c.firebaseio.com/angularproject-e129c.json?auth=' + token, 
                 this.recipeService.getRecipe(),
                 { headers: this.headers }   
        );
    }

    getRecipes()
    {
        const token = this.authService.getToken();
        this.httpClient.get('https://angularproject-e129c.firebaseio.com/angularproject-e129c.json?auth='+token)
                 .subscribe((response: Recipe[]) => {
                     const recipe: Recipe[] = response;
                     this.recipeService.setRecipes(recipe);
                 });
    }

}