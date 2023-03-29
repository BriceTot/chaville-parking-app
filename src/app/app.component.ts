import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from "firebase/compat";
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: firebase.User | null | undefined; // Declare a user variable to hold the current user

  constructor(private afAuth: AngularFireAuth, private userService: UserService) {
    this.afAuth.authState.subscribe(userCredential => {
      this.user = userCredential; // Update the user variable whenever the authState changes
      this.userService.user = userCredential;
    });
  }
}
