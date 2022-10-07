import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc, getDoc } from '@angular/fire/firestore'
import { Auth } from '@angular/fire/auth'
import { TestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private auth: Auth, private firestore: Firestore) { }
  
  curUser;
  
  setUser(newUser){
    this.curUser = newUser
  }

  async saveContactInfo({name, email, pnumber, address}){
    const userDocRef = doc(this.firestore, `users/${this.curUser.email}`);
    await setDoc(userDocRef, {name: name, email: email, phone: pnumber, address: address}, {merge: true},)
  }

  async getData(){
    const userDocRef = doc(this.firestore, `users/${this.curUser.email}`);
    const docSnap = await getDoc(userDocRef);
    return docSnap.data();
  }

  async addContact(newContact: string[]){
    const userDocRef = doc(this.firestore, `users/${this.curUser.email}`);
    const docSnap = await getDoc(userDocRef);
    var curCon: any = docSnap.data().contacts;
    curCon = [...curCon, {name: newContact[0], email: newContact[1], phone: newContact[2], address: newContact[3]}]
    await setDoc(userDocRef, {contacts: curCon}, {merge: true},);
  }

  async updateContacts(updatedContacts){
    const userDocRef = doc(this.firestore, `users/${this.curUser.email}`);
    const docSnap = await getDoc(userDocRef);
    await setDoc(userDocRef, {contacts: updatedContacts}, {merge: true});
  }
}
