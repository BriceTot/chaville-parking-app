import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase} from "@angular/fire/compat/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  offerData : any[] | undefined

  constructor(private db: AngularFireDatabase, private router: Router, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.db.list('Offre').valueChanges().subscribe(data => {
      this.offerData = data;
    });
  }

  signOut(){
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/login')
    });
  }

}
