import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Patient } from '../entities/patient';
import { Specialist } from '../entities/specialist';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private itemsCollection?: AngularFirestoreCollection<any>;
  public specialist: Specialist | any;
  public patient: Patient | any;

  constructor(private authService: AuthService, private afs: AngularFirestore) { }

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
