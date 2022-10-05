import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

import { doc, Firestore, setDoc } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private authentic: Auth, private firestore: Firestore) { }

  async register({ email, password, name, phone }) {
    try {
      const user = await createUserWithEmailAndPassword(this.authentic, email, password);
      const userDocRef = doc(this.firestore, `users/${email}`);
      await setDoc(userDocRef, {contacts: [{name: 'test', email: 'test@gmail.com', phone: '0333333333', address: '123 test streeet'}], name: name, email: email, phone: phone, address: ' '})
      return user;
    }
    catch (e) {
      return null;
    }
  }

  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(this.authentic, email, password);
      return user;
    }
    catch (e) {
      return null;
    }
  }

  
}
