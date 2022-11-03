import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { collection, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public user = new User();

  constructor(private afs: AngularFirestore, private firestore: Firestore) { }

  async addUser(user: User) {
    let newUser: User = {
      email: user.email,
      password: user.password,
      displayName: user.name,
      photoURL: user.photoURL,
      name: user.name,
      lastName: user.lastName,
      age: user.age,
      dni: user.dni,
      socialWork: user.socialWork,
      imageUrl: user.imageUrl,
      specialty: user.specialty,
      enable: user.enable,
      role: user.role,
      uid: user.uid,
    };
    return await this.afs.collection('users').add(newUser);
  }

  async getUsers(user: any) {
    const pattientRef = collection(this.firestore, 'users');
    const q = query(pattientRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      return doc.data();
    });
  }

  getUserAllPatient(): Observable<User[]> {
    const pattientRef = collection(this.firestore, 'users');
    const q = query(pattientRef, where("role", "==", "Patient"));
    return collectionData(q, { idField: 'id' }) as Observable<User[]>;
  }

  getUserId(userUid: any): Observable<User[]> {
    const pattientRef = collection(this.firestore, 'users');
    const q = query(pattientRef, where("uid", "==", userUid));
    return collectionData(q, { idField: 'id' }) as Observable<User[]>;
  }

  getUserAllSpecialist(): Observable<User[]> {
    const pattientRef = collection(this.firestore, 'users');
    const q = query(pattientRef, where("role", "==", "Specialist"));
    return collectionData(q, { idField: 'id' }) as Observable<User[]>;
  }

  getUserAll(): Observable<User[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
  }

  deleteUser(user: User) {
    const userDocRef = doc(this.firestore, `users/${user.id}`);
    return deleteDoc(userDocRef);
  }

  approveUser(user: User) {
    const patientRef = this.afs.collection('users');
    patientRef.doc(user.id).update({ enabled: true });
  }

  updateUser(user: User, status: boolean) {
    const placeRef = doc(this.firestore, `users/${user.id}`);
    return updateDoc(placeRef, { enable: status });
  }
}
