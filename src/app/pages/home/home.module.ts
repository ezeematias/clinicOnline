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
import { ListTostringPipe } from 'src/app/pipes/list-tostring.pipe';
import { TunsHourPipe } from 'src/app/pipes/tuns-hour.pipe';
import { TurnsComponent } from 'src/app/components/turns/turns.component';
import { TunsDayPipe } from 'src/app/pipes/tuns-day.pipe';
import { TunsListDayPipe } from 'src/app/pipes/tuns-list-day.pipe';
import { DayFormatPipe } from 'src/app/pipes/day-format.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    ListTostringPipe,
    TunsHourPipe,
    TunsDayPipe,
    TunsListDayPipe,
    DayFormatPipe,
    AdminPanelComponent,
    PacientListComponent,
    SpecialistListComponent,
    ProfileComponent,
    RegistrationComponent,
    ScheduleComponent,
    SelectoButtonComponent,
    MyShiftComponent,
    TurnsComponent
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
