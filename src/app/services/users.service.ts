import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
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
    };
    console.log("USUARIO ANTES DE CARGARLO")
    console.log(newUser);
    console.log(user);
    return await this.afs.collection('users').add(newUser);
  }

  async getUsers() {
    const pattientRef = collection(this.firestore, 'user');
    const q = query(pattientRef, where("name", "==", "Ezequiel"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      return doc.data();
    });
  }

  getUserAll(): Observable<User[]> {
    const pattientRef = collection(this.firestore, 'user');
    return collectionData(pattientRef, { idField: 'id' }) as Observable<User[]>;
  }

  deleteUser(user: User) {
    const userDocRef = doc(this.firestore, `user/${user.id}`);
    return deleteDoc(userDocRef);
  }

  approveUser(user: User) {
    const patientRef = this.afs.collection('user');
    patientRef.doc(user.id).update({ enabled: true });
  }

  updateUser(user: User, status: boolean) {
    const placeRef = doc(this.firestore, `user/${user.id}`);
    return updateDoc(placeRef, { enable: status });
  }
}
