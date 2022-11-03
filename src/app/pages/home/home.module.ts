import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PacientListComponent } from 'src/app/components/pacient-list/pacient-list.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { SpecialistListComponent } from 'src/app/components/specialist-list/specialist-list.component';
import { ProfileComponent } from '../profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HomeComponent,
    AdminPanelComponent,
    PacientListComponent,
    SpecialistListComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule,
  ]
})
export class HomeModule { }
