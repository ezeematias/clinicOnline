import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Patient } from '../entities/patient';
import { Specialist } from '../entities/specialist';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  public specialist: Specialist | any;
  public patient: Patient | any;

  constructor(private afs: AngularFirestore, private firestore: Firestore) { }

  async addPatient(patient: Patient) {
    let newPatient: Patient = {
      email: patient.email,
      password: patient.password,
      displayName: patient.name,
      photoURL: patient.photoURL,
      name: patient.name,
      lastName: patient.lastName,
      age: patient.age,
      dni: patient.dni,
      socialWork: patient.socialWork,
      imageUrl: patient.imageUrl,
    };
    return await this.afs.collection('patient').add(newPatient);
  }

  getPatient(): Observable<Patient[]> {
    const pattientRef = collection(this.firestore, 'patient');
    return collectionData(pattientRef, { idField: 'id' }) as Observable<Patient[]>;
  }

  deletePatient(patient: Patient) {
    const patientDocRef = doc(this.firestore, `patient/${patient.id}`);
    return deleteDoc(patientDocRef);
  }

  async addSpecialist(specialist: Specialist) {
    let newSpecialist: Specialist = {
      email: specialist.email,
      password: specialist.password,
      displayName: specialist.name,
      photoURL: specialist.photoURL,
      name: specialist.name,
      lastName: specialist.lastName,
      age: specialist.age,
      dni: specialist.dni,
      specialist: specialist.specialist,
      imageUrl: specialist.imageUrl,
    };

    return await this.afs.collection('patient').add(newSpecialist);
  }
}
