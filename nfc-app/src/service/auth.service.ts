import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

import { doc, Firestore, setDoc } from '@angular/fire/firestore'
import { DatabaseService } from 'src/app/service/database.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private authentic: Auth, private firestore: Firestore, private db: DatabaseService) { }

  
  
  async register({ email, password, name, phone, address, company}) {
    try {
      const user = await createUserWithEmailAndPassword(this.authentic, email, password);
      const userDocRef = doc(this.firestore, `users/${email}`);
      await setDoc(userDocRef, {contacts: [], name: name, email: email, phone: phone, address: address, company: company})
      this.db.setUser(this.authentic.currentUser);
      return user;
    }
    catch (e) {
      return null;
    }
  }

  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(this.authentic, email, password); 
      if(user){
        this.db.setUser(this.authentic.currentUser);
      }
      return user;
    }
    catch (e) {
      return null;
    }
  }

  logout(){
    this.authentic.signOut();
  }
}
