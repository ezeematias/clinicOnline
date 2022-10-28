import { Component, OnInit } from '@angular/core';
import { Specialist } from 'src/app/entities/specialist';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.scss']
})
export class SpecialistListComponent implements OnInit {

  specialists: Specialist[] = [];

  constructor(private firestore: FirestoreService) {

  }

  ngOnInit(): void {
    this.firestore.getSpecialistAll().subscribe((specialist) => {
      this.specialists = specialist;
    })
  }

  async onClickDeleted(specialist: Specialist) {
    const resp = await this.firestore.deleteSpecialist(specialist);
    console.log(resp);
  }
  async onClickupdate(specialist: Specialist, status: boolean) {
    await this.firestore.updateSpecialist(specialist, status);
  }

}
