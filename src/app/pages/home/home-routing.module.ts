import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { AdminShiftComponent } from '../admin-shift/admin-shift.component';
import { MyShiftComponent } from '../my-shift/my-shift.component';
import { ProfileComponent } from '../profile/profile.component';
import { ReportsComponent } from '../reports/reports.component';
import { RequestShiftComponent } from '../request-shift/request-shift.component';
import { SpecialistPanelComponent } from '../specialist-panel/specialist-panel.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: '/home/profile' },
      { path: 'panel', component: AdminPanelComponent, canActivate: [AdminGuard], data: { state: 'panel' } },
      { path: 'profile', component: ProfileComponent, data: { state: 'profile' } },
      { path: 'turns', component: MyShiftComponent, data: { state: 'turns' } },
      { path: 'request', component: RequestShiftComponent, data: { state: 'request' } },
      { path: 'panel-shift', component: AdminShiftComponent, data: { state: 'panel-shift' } },
      { path: 'panel-patient', component: SpecialistPanelComponent, data: { state: 'panel-patient' } },
      { path: 'reports', component: ReportsComponent, data: { state: 'reports' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
