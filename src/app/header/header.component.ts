import { Component, EventEmitter, Output }  from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: 'header.component.html',
	styleUrls: ['header.component.css']

})

export class HeaderComponent {
	header = 'header-details';
	
	constructor(private dataStorageService: DataStorageService,
				private authService: AuthService) {}

    @Output('navigationFeature') feature  = new EventEmitter<string>();

	storeRecipes()
	{
		this.dataStorageService.storeRecipe()
			.subscribe((response: Response) => {
				console.log(response);
			});
	}

	fetchRecipes() 
	{
		this.dataStorageService.getRecipes();
	}

	onLogout() {
		this.authService.logout();
	}

    // onSelect(feature: string) { 

	// 	this.feature.emit(feature);

	// }


}