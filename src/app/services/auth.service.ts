import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, updateProfile, UserCredential } from "firebase/auth";
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userCredential: UserCredential | any;

  constructor(public afauth: AngularFireAuth, private router: Router, private readonly auth: Auth) { }

  async sendEmail() {
    this.userCredential = this.auth.currentUser;
    return await sendEmailVerification(this.userCredential).then((res) => { console.log("Se envió correctamente", res); }).catch(error => { console.log("Error en ingreso", error) }).finally(() => { });
  }

  async login(email: string, password: string) {

    return await signInWithEmailAndPassword(this.auth, email, password).then(res => {
      if (res.user?.emailVerified) {
        this.router.navigate(['home'])
      } else {
        this.userCredential = res;
        this.router.navigate(['verification'])
      }

    }).catch(error => {
      switch (error.code) {
        case 'auth/invalid-email':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/internal-error':
          throw new Error('Credenciales Inválidas');
        default:
          throw new Error(error.message);
      }
    });
  }

  async loginWuthGoogle(email: string, password: string) {
    return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => this.router.navigate(['home'])).catch(error => {
      throw new Error('Error de logueo de Google');
    });
  }

  async register(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password).then(res => { sendEmailVerification(res.user), this.router.navigate(['verification']) }).catch(error => {
      switch (error.code) {
        case 'auth/invalid-email':
          throw new Error('Mail Inválido');
        case 'auth/email-already-in-use':
          throw new Error('El correo ya se encuentra en uso');
        default:
          throw new Error(error.message);
      }
    });
  }

  async uploadUser(name: string, url: string) {
    let auth = getAuth();
    console.log(url);
    return await updateProfile(auth.currentUser!, { displayName: name, photoURL: url }).then(() => console.log(auth.currentUser?.photoURL)).catch(
      (err) => console.log(err));
  }  

  async logout() {
    return await this.afauth.signOut().then(res => this.router.navigate(['login'])).catch(error => {
      throw new Error('Error en desloguearse');
    });
  }

  getAuth() {
    return this.afauth.authState;
  }
}