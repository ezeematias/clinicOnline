import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { collection, Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  logs: any;
  public userLog: any = {};

  constructor(private authService: AuthService, private db: AngularFirestore) {
    this.authService.getAuth().subscribe(user => {
      if (user) {
        this.userLog.name = user.displayName;
        this.userLog.uid = user.uid;
        this.userLog.email = user.email;
      }
    });
  }

  public async registerUserLoginTime(user: FormGroup) {
    this.logs = {
      email: user.get('email')?.value,
      loginTime: new Date().toLocaleString(),
    }
    return await this.db.collection('logs').add(this.logs);
  }

  async getLogs() {
    return await this.db.collection('logs').valueChanges();
  }
}
