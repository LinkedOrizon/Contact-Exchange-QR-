import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc, getDoc } from '@angular/fire/firestore'
import { Auth } from '@angular/fire/auth'
import { TestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private auth: Auth, private firestore: Firestore) { }
  
  curUser = this.auth.currentUser
  async saveContactInfo({name, email, pnumber, address}){
    alert(this.curUser.email);
    const userDocRef = doc(this.firestore, `users/${this.curUser.email}`);
    await setDoc(userDocRef, {name: name, email: email, phone: pnumber, address: address}, {merge: true},)
  }

  async getData(){
    const userDocRef = doc(this.firestore, `users/${this.curUser.email}`);
    const docSnap = await getDoc(userDocRef);
    return docSnap.data();
  }
}
