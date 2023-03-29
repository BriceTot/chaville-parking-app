import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase} from "@angular/fire/compat/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {Router} from "@angular/router";


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  parkingData : any[] | undefined

  constructor(private db: AngularFireDatabase, private router: Router, private afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.db.list('Parking').valueChanges().subscribe(data => {
      this.parkingData = data;
    });
  }

  signOut(){
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/login')
    });
  }
}
