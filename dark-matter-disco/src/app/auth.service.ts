import { Injectable } from '@angular/core';
// import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { firebase } from '../../firebaseConfig.js'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //inject auth service and angular router
  // public  router:  Router
  constructor(public  afAuth:  AngularFireAuth) { }
  //store user data
  // user: User;
  //google sign in
  signInWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }
}
