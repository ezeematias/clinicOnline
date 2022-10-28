import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Patient } from '../entities/patient';
import { Specialist } from '../entities/specialist';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  //Patient Services ---------------------------------------------
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
      enable: patient.enable,
      typeUser: "Patient",
    };
    return await this.afs.collection('patient').add(newPatient);
  }

  async getPatient() {
    const pattientRef = collection(this.firestore, 'patient');
    const q = query(pattientRef, where("name", "==", "Ezequiel"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      return doc.data();
    });
  }

  getPatientAll(): Observable<Patient[]> {
    const pattientRef = collection(this.firestore, 'patient');
    return collectionData(pattientRef, { idField: 'id' }) as Observable<Patient[]>;
  }


  deletePatient(patient: Patient) {
    const patientDocRef = doc(this.firestore, `patient/${patient.id}`);
    return deleteDoc(patientDocRef);
  }

  updatePlace(place: Patient, status: boolean) {
    const placeRef = doc(this.firestore, `patient/${place.id}`);
    return updateDoc(placeRef, { enable: status });
  }

  //Specialist Service ---------------------------------------------
  public specialist: Specialist | any;

  getSpecialistAll(): Observable<Specialist[]> {
    const pattientRef = collection(this.firestore, 'specialist');
    return collectionData(pattientRef, { idField: 'id' }) as Observable<Specialist[]>;
  }

  approveSpecialist(specialist: Specialist) {
    const patientRef = this.afs.collection('specialist');
    patientRef.doc(specialist.id).update({ enabled: true });
  }

  deleteSpecialist(specialist: Specialist) {
    const patientDocRef = doc(this.firestore, `specialist/${specialist.id}`);
    return deleteDoc(patientDocRef);
  }

  updateSpecialist(specialist: Specialist, status: boolean) {
    const placeRef = doc(this.firestore, `specialist/${specialist.id}`);
    return updateDoc(placeRef, { enable: status });
  }

  async addSpecialist(specialist: Specialist) {
    console.log(specialist);
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
      enable: false,
      typeUser: "Specialist",
    };

    return await this.afs.collection('specialist').add(newSpecialist);
  }
}
