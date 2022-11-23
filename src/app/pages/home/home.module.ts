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
import { RequestShiftComponent } from '../request-shift/request-shift.component';
import { TurnsListComponent } from 'src/app/components/turns-list/turns-list.component';
import { TurnsFilterPipe } from 'src/app/pipes/turns-filter.pipe';
import { TurnsListAssignedComponent } from 'src/app/components/turns-list-assigned/turns-list-assigned.component';
import { TurnsFilterSPipe } from 'src/app/pipes/turns-filter-s.pipe';
import { TurnsListAllComponent } from 'src/app/components/turns-list-all/turns-list-all.component';
import { TurnsFilterAPipe } from 'src/app/pipes/turns-filter-a.pipe';
import { AdminShiftComponent } from '../admin-shift/admin-shift.component';
import { SpecialistPanelComponent } from '../specialist-panel/specialist-panel.component';
import { SummaryComponent } from 'src/app/components/summary/summary.component';
import { SummaryListComponent } from 'src/app/components/summary-list/summary-list.component';
import { PatientCardListComponent } from 'src/app/components/patient-card-list/patient-card-list.component';
import { SummaryDinamicPipe } from 'src/app/pipes/summary-dinamic.pipe';
import { FormatDayPipe } from 'src/app/pipes/format-day.pipe';
import { ReportsComponent } from '../reports/reports.component';

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
    RequestShiftComponent,
    TurnsListComponent,
    TurnsComponent,
    TurnsFilterPipe,
    TurnsListAssignedComponent,
    TurnsFilterSPipe,
    TurnsListAllComponent,
    TurnsFilterAPipe,
    AdminShiftComponent,
    SpecialistPanelComponent,
    SummaryComponent,
    SummaryListComponent,
    PatientCardListComponent,
    SummaryDinamicPipe,
    FormatDayPipe,
    ReportsComponent,
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
