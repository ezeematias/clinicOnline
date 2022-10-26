import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userCredential: UserCredential | any;

  constructor(public afauth: AngularFireAuth, private router: Router, private readonly auth: Auth) {
  }

  async sendEmail(){
    return await sendEmailVerification(this.userCredential.user);
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

  async register2(email: string, password: string) {
    try {
      const newUserCredential: UserCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await sendEmailVerification(newUserCredential.user);
      this.router.navigate(['verification']);
      return newUserCredential;
    } catch (error) {
      switch (error) {
        case 'auth/invalid-email':
          throw new Error('Mail Inválido');
        case 'auth/email-already-in-use':
          throw new Error('El correo ya se encuentra en uso');
        default:
          throw new Error();
      }
    }
  }

  async logout() {
    return await this.afauth.signOut().then(res => this.router.navigate(['login'])).catch(error => {
      ;
      throw new Error('Error en desloguearse');
    });
  }

  getAuth() {
    return this.afauth.authState;
  }
}