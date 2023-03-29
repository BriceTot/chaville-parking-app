import { Injectable } from '@angular/core';
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: firebase.User | null | undefined;

  constructor() { }
}
