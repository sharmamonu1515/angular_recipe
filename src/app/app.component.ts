import { Component, OnInit } from '@angular/core';
import * as firbase  from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  loadedFeature: string = 'recipe';

  ngOnInit() {
   firbase.initializeApp({
    apiKey: "AIzaSyD9xaNXjbxmNlXDoCTP31-qb08zH3MlzRU",
    authDomain: "angularproject-e129c.firebaseapp.com",
   });
    
  }

  onClickNavigation(feature: 'recipe') {
  		this.loadedFeature = feature;
  }
}
