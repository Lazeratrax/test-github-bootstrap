import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

// export const provider = new GithubAuthProvider();
// export const auth = getAuth();

// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//     const credential = GithubAuthProvider.credentialFromResult(result);
//     // const token = credential.accessToken;

//     // The signed-in user info.
//     const user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The AuthCredential type that was used.
//     const credential = GithubAuthProvider.credentialFromError(error);
//     // ...
//   });

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') || '{}');
      } else {
        localStorage.setItem('user', null || '');
        JSON.parse(localStorage.getItem('user') || '');
      }
    })
  }

  // Sign in with email/password
  SignIn(email: any, password: any) {
    return this.afAuth.
      signInWithEmailAndPassword(email, password)
      .then((result: { user: any; }) => {
        this.ngZone.run(() => {
          this.router.navigate(['blocks']);
        });
        this.SetUserData(result.user);
      }).catch((error: { message: any; }) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email: any, password: any) {
    return this.afAuth.
      // auth.
      createUserWithEmailAndPassword(email, password)
      .then((result: { user: any; }) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error: { message: any; }) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth
      .currentUser
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth.
      sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error: any) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    console.log('vvvvvv', this);
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null;
    console.log('vvvvvv', this, user);
    return (user !== null && user !== '' && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    console.log('CCCCC', this);
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Sign in with Github
  GithubAuth() {
    console.log('CCCCC', this);
    return this.AuthLogin(new firebase.auth.GithubAuthProvider());
    // return new firebase.auth.GithubAuthProvider();

  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    const auth = getAuth();
    console.log('cccccc', provider, this);
    return firebase.auth().signInWithPopup(provider)
   
    .then(function(result) {
      console.log('cccccc', provider, result);
      //  var token = result.credential.accessToken;
       var user = result.user;
     
      //  console.log(token)
       console.log(user)
    }).catch(function(error) {
       var errorCode = error.code;
       var errorMessage = error.message;
     
       console.log(error.code)
       console.log(error.message)
    });
    // this.afAuth.signInWithPopup(provider)
    //   .then((result: { user: any; }) => {
    //     console.log('cccccc', result, this);
    //     this.ngZone.run(() => {
    //       // dashboard
    //       // blocks
    //       setTimeout(() => { this.router.navigate(['dashboard']); }, 300)
    //     })
    //     this.SetUserData(result.user);
    //   }).catch((error: any) => {
    //     window.alert(error)
    //   })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: { uid: any; email: any; displayName: any; photoURL: any; emailVerified: any; }) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.
      signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
      })
  }

  

}
// https://github.com/Lazeratrax
// https://github-bootstrap.firebaseapp.com/__/auth/handler
// Topsecret1234

// AppNameOne
// github-bootstrap.firebaseapp.com
// http://localhost:4200/


// f438b0346488998fcbc9
// eb345687cfabe41cea3820272c6e00a78bde1f8b