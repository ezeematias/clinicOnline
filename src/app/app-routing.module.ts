import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { PermissionsGuard } from './guards/permissions.guard';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verification', component: VerificationComponent },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)/*, canActivate: [PermissionsGuard]*/ },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
