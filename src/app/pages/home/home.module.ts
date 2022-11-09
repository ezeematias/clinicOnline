import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PacientListComponent } from 'src/app/components/pacient-list/pacient-list.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { SpecialistListComponent } from 'src/app/components/specialist-list/specialist-list.component';
import { ProfileComponent } from '../profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleComponent } from 'src/app/components/schedule/schedule.component';
import { SelectoButtonComponent } from 'src/app/components/selecto-button/selecto-button.component';
import { MyShiftComponent } from '../my-shift/my-shift.component';

@NgModule({
  declarations: [
    HomeComponent,
    AdminPanelComponent,
    PacientListComponent,
    SpecialistListComponent,
    ProfileComponent,
    RegistrationComponent,
    ScheduleComponent,
    SelectoButtonComponent,
    MyShiftComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
