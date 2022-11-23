import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SpinnerModule } from './components/spinner/spinner.module';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { AuthService } from './services/auth.service';
import { PermissionsGuard } from './guards/permissions.guard';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { VerificationComponent } from './pages/verification/verification.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { UsersService } from './services/users.service';
import { ManagementService } from './services/management.service';
import { SpecialtyComponent } from './components/specialty/specialty.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportsComponent } from './pages/reports/reports.component';

const firebaseConfig = {
  projectId: 'eu-cliniconline',
  appId: '1:826947770950:web:702b4d66632faa25fe4847',
  storageBucket: 'eu-cliniconline.appspot.com',
  locationId: 'us-central',
  apiKey: 'AIzaSyBCkbwYkMKyoNUzNugwmMhU7QwVicYKREM',
  authDomain: 'eu-cliniconline.firebaseapp.com',
  messagingSenderId: '826947770950',
  measurementId: 'G-D3C9S1K8CV',
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    NotFoundComponent,
    VerificationComponent,
    WelcomeComponent,
    CaptchaComponent,
    SpecialtyComponent,    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SpinnerModule,
    AngularFirestoreModule,
    AngularFireStorageModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())
  ],
  providers: [AuthService, UsersService, ManagementService, PermissionsGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
