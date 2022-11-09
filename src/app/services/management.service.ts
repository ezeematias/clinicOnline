import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { User } from 'firebase/auth';
import { collection, Firestore, query, where } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { ScheduleManagement } from '../entities/schedule-management';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  //public schedule = new ScheduleManagement();

  constructor(private afs: AngularFirestore) { }

  async addSchedule(schedule: ScheduleManagement) {
    let newSchedule: ScheduleManagement = {
      specialist: schedule.specialist,
      specialty: schedule.specialty,
      timeShift: schedule.timeShift,
      schedule: schedule.schedule,
    }
    return await this.afs.collection('schedules').add(newSchedule);
  }
/*
  getUserId(userUid: any): Observable<ScheduleManagement[]> {
    const pattientRef = collection(this.firestore, 'schedules');
    const q = query(pattientRef, where("uid", "==", userUid));
    return collectionData(q, { idField: 'id' }) as Observable<ScheduleManagement[]>;
  }*/

}
