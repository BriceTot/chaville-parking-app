import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {Router} from "@angular/router";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../user.service';
import firebase from "firebase/compat";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(private router: Router, private afAuth: AngularFireAuth, private userService: UserService,
              private alertController: AlertController) {
  }

  ngOnInit() {
  }

  async login() {
    if (this.user.email===null ||  this.user.email==="" || this.user.password===null || this.user.password===""){
      this.presentAlert('emptyLogin', 'Veuillez remplir les champs demandés');
    }
    else{
      const auth = getAuth()
      await signInWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then((userCredential) => {
          // Signed in
          this.userService.user = userCredential.user  as firebase.User;
          this.router.navigateByUrl('/tabs')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.presentAlert(errorCode, errorMessage);
        });
    }
  }

  async register() {

    if (this.user.email===null ||  this.user.email==="" || this.user.password===null || this.user.password===""){
      this.presentAlert('emptyLogin', 'Veuillez remplir les champs demandés');
    }
    else {
      const auth = getAuth()
      await createUserWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then((userCredential) => {
          // Signed in
          this.userService.user = userCredential.user as firebase.User;
          this.router.navigateByUrl('/tabs')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.presentAlert(errorCode, errorMessage);
        });
    }
  }

  async presentAlert(errorCode: string, errorMessage: string) {
    let message: string;

    switch (errorCode) {
      case "auth/invalid-email":
        message = "Email invalide";
        break;
      case "auth/user-disabled":
        message = "Compte désactivé";
        break;
      case "auth/user-not-found":
        message = "Utilisateur introuvable";
        break;
      case "auth/wrong-password":
        message = "Mot de passe incorrect";
        break;
      case "auth/email-already-in-use":
        message = "Email déjà utilisé";
        break;
      case "auth/weak-password":
        message = "Mot de passe trop faible, veuillez utiliser un mot de passe d'au moins 6 caractères";
        break;
      default:
        message = errorMessage;
        break;
    }

    const alert = await this.alertController.create({
      header: 'Erreur',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
