import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { ProfileComponent } from '../profile/profile.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: '/home/panel' },
      { path: 'panel', component: AdminPanelComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
