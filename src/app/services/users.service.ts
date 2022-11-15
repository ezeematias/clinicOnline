import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData, Firestore, doc, deleteDoc } from '@angular/fire/firestore';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ScheduleManagement } from '../entities/schedule-management';
import { Specialty } from '../entities/specialty';
import { User } from '../entities/user';
import { RoleValidator } from '../helpers/role-validator';
import { Turns } from '../entities/turns';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends RoleValidator {
  public user = new User();
  public isLogged = false;
  public userLogged: User | any;

  constructor(private afs: AngularFirestore, private firestore: Firestore) {
    super();
  }

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
      registerAdmin: user.registerAdmin
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

  getUserEmail(email: any, collectionName: string): Observable<User[]> {
    const pattientRef = collection(this.firestore, collectionName);
    const q = query(pattientRef, where("email", "==", email));
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

  updateUserUid(user: User, uid: string) {
    const placeRef = doc(this.firestore, `users/${user.id}`);
    return updateDoc(placeRef, { uid: uid, registerAdmin: false });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user !== null) ? true : false;
  }

  // Schedule
  async addSchedule(schedule: ScheduleManagement) {
    let newSchedule: ScheduleManagement = {
      specialist: schedule.specialist,
      specialty: schedule.specialty,
      timeShift: schedule.timeShift,
      schedule: schedule.schedule,
    }
    return await this.afs.collection('schedules').add(newSchedule);
  }

  getScheduleId(userUid: any): Observable<ScheduleManagement[]> {
    const pattientRef = collection(this.firestore, 'schedules');
    const q = query(pattientRef, where("specialist", "==", userUid));
    return collectionData(q, { idField: 'id' }) as Observable<ScheduleManagement[]>;
  }

  updateSchule(user: ScheduleManagement, change: ScheduleManagement) {
    const placeRef = doc(this.firestore, `schedules/${user.id}`);
    return updateDoc(placeRef, { schedule: change.schedule, timeShift: change.timeShift });
  }

  //Specialty
  async addSpecialty(specialty: Specialty) {
    let newSpecialty: Specialty = {
      name: specialty.name,
    }
    return await this.afs.collection('specialty').add(newSpecialty);
  }

  getSpecialtyAll(): Observable<Specialty[]> {
    const userRef = collection(this.firestore, 'specialty');
    return collectionData(userRef, { idField: 'id' }) as Observable<Specialty[]>;
  }

  //Turns
  async addTurn(turn: Turns) {
    let newTurn: Turns = {
      name: turn.name,
      specialist: turn.specialist,
      patient: turn.patient,
      date: turn.date,
      day: turn.day,
      dayWeek: turn.dayWeek,
      month: turn.month,
      hour: turn.hour,
      minutes: turn.minutes,
      poll: turn.poll,
      rating: turn.rating,
      status: turn.status,
    }
    return await this.afs.collection('turns').add(newTurn);
  }

  getReservedTurns(specialist: string) {
    const data: Turns[] = [];
    return firebase
      .firestore()
      .collection('turns')
      .where('specialist', '==', specialist)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        return data;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

}
