import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public myAngularxQrCode: string = "";

  constructor(private userService: UserService, private router: Router, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
      if (this.userService.user && this.userService.user.email) {
        this.myAngularxQrCode = this.userService.user.email;
      }
  }

  signOut(){
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/login')
    });
  }

}
