import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/entities/patient';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];

  constructor(private firestore: FirestoreService) {

  }

  ngOnInit(): void {
    this.firestore.getPatient().subscribe((patient) => {
      this.patients = patient;
    })
  }

  async onClickDeleted(patient: Patient) {
    const resp = await this.firestore.deletePatient(patient);
    console.log(resp);
  }

}
