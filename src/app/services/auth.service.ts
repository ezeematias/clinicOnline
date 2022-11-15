import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, updateProfile, UserCredential } from "firebase/auth";
import { Auth } from '@angular/fire/auth';
import { User } from '../entities/user';
import { StorageService } from './storage.service';
import { UsersService } from './users.service';
import { Specialty } from '../entities/specialty';
import { IfStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public userCredential: UserCredential | any;

  constructor(private afauth: AngularFireAuth,
    private router: Router,
    private readonly auth: Auth,
    private userService: UsersService,
    private storage: StorageService) { }

  async sendEmail() {
    return await sendEmailVerification(this.auth.currentUser!).then((res) => {
      console.log("Se envió correctamente", res);
    }).catch(error => {
      console.log("Error en ingreso", error)
    }).finally(() => { });
  }

  async login(user: User): Promise<any> {
    return await signInWithEmailAndPassword(this.auth, user.email, user.password).then(res => {
      this.userService.isLogged = true;
      if (res.user?.emailVerified) {
        this.router.navigate(['home'])
      } else {
        this.router.navigate(['verification'])
      }
      this.userCredential = res;
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

  async register(user: User, files: any, specialty: Specialty[], isSpecialist: boolean) {
    return await createUserWithEmailAndPassword(this.auth, user.email, user.password).then(res => {
      sendEmailVerification(res.user);
      user.uid = res.user.uid;
      user.role = isSpecialist ? 'Specialist' : 'Patient';
      user.registerAdmin = false;
      user.specialty = specialty;
      console.log(specialty);
      this.storage.updateImages(user.email, files).then(async () => {
        await this.storage.getImages(user.email).then(() => {
          this.uploadUser(user.name, this.storage.listUrl[0]);
          user.photoURL = this.storage.listUrl[0];
          user.imageUrl = [...this.storage.listUrl];
          this.userService.addUser(user)?.catch(() => { console.log('Error sending patient') });
        })
      })
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

  async registerAdmin(user: User): Promise<string> {
    return await createUserWithEmailAndPassword(this.auth, user.email, user.password).then(res => {
      sendEmailVerification(res.user);
      this.uploadUser(user.name, user.photoURL);
      this.router.navigate(['verification']);
      return res.user.uid;
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

  async registerPanel(user: User, files: any) {
    user.registerAdmin = true;
    user.uid = 'n/n';
    this.storage.updateImages(user.email, files).then(async () => {
      await this.storage.getImages(user.email).then(() => {
        user.photoURL = this.storage.listUrl[0];
        user.imageUrl = [...this.storage.listUrl];
        console.log(user);
        this.userService.addUser(user)?.catch(() => { console.log('Error sending patient') });
      })
    })
  }

  getUserData(): User {
    console.log(JSON.parse(sessionStorage.getItem('user')!));
    return JSON.parse(sessionStorage.getItem('user')!);
  }

  async uploadUser(name: string, url: string) {
    let auth = getAuth();
    return await updateProfile(auth.currentUser!, { displayName: name, photoURL: url }).then().catch(
      (err) => console.log(err));
  }

  async uploadPhoto(url: string) {
    let auth = getAuth();
    return await updateProfile(auth.currentUser!, { photoURL: url }).then().catch(
      (err) => console.log(err));
  }

  async logout() {
    sessionStorage.clear();
    this.userService.isLogged = false;
    this.userService.userLogged = [];
    return await this.afauth.signOut().then(res => this.router.navigate(['welcome'])).catch(error => {
      throw new Error('Error en desloguearse');
    });
  }

  getAuth() {
    return this.afauth.authState;
  }

  deleteUserAuth(user: User) {
  }

  async currentUser(): Promise<string> {
    let auth = await getAuth();
    return auth.currentUser?.uid!;

  }

  async userCurrent() {
    let auth = await getAuth();
    return auth;
  }
}