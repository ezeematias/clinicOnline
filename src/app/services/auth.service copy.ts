import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, updateProfile, UserCredential } from "firebase/auth";
import { Auth } from '@angular/fire/auth';
import { User } from '../entities/user';
import { Observable, of, switchMap } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { RoleValidator } from '../helpers/role-validator';

@Injectable({
  providedIn: 'root'
})

export class AuthService extends RoleValidator {

  public user$: Observable<User | any>;
  public userCredential: UserCredential | any;

  constructor(public afauth: AngularFireAuth, private router: Router, public readonly auth: Auth, private afs: AngularFirestore) {
    super();
    this.user$ = this.afauth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async sendEmail() {
    return await sendEmailVerification(this.auth.currentUser!).then((res) => {
      console.log("Se envió correctamente", res);
    }).catch(error => {
      console.log("Error en ingreso", error)
    }).finally(() => { });
  }

  async login(user: User): Promise<any> {
    return await signInWithEmailAndPassword(this.auth, user.email, user.password).then(res => {
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
  async login2(user: User) {    
    return await this.afauth.signInWithEmailAndPassword(user.email, user.password).then(res => {
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
    return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res => this.router.navigate(['welcome'])).catch(error => {
      throw new Error('Error de logueo de Google');
    });
  }

  async register(user: User) {
    return await createUserWithEmailAndPassword(this.auth, user.email, user.password).then(res => {
      sendEmailVerification(res.user);
      this.router.navigate(['verification']);
      return res;
    }).catch(error => {
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
  async logout2() {
    return await this.auth.signOut().then(res => this.router.navigate(['login'])).catch(error => {
      throw new Error('Error en desloguearse');
    });
  }

  getAuth() {
    return this.afauth.authState;
  }

  async getCurrentUser() {
    return await this.afauth.currentUser;
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    //const data: User = {    
  }
}