import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
    constructor(private router: Router) {}
    token: string;
    onSignup(email: string, password: string)
    {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                response =>  console.log(response)
            )
            .catch(
                error => console.log(error)
            );
    }

    onSignin(email: string, password: string)
    {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.router.navigate(['/']);
                    firebase.auth().currentUser.getIdToken()
                    .then (
                        (token: string) => {
                            this.token = token;
                            console.log(token);
                        } 
                    );
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
                    .then (
                        (token: string) => this.token = token
                    );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

}