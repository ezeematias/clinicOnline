import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
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
import { VerificationComponent } from './pages/verification/verification.component';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { SpecialistListComponent } from './components/specialist-list/specialist-list.component';

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
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    NotFoundComponent,
    VerificationComponent,
    PatientListComponent,
    AdminPanelComponent,
    SpecialistListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    SpinnerModule,
    AngularFirestoreModule,
    AngularFireStorageModule, provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
