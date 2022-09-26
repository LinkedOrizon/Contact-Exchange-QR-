import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private authentic: AngularFireAuth) { }

  async register ({email, password}){
    try{
      const user = await this.authentic.createUserWithEmailAndPassword(email, password);
      return user;
    }
    catch (e) {
      return null;
    }
  }

  async login ({email, password}){
    try{
      const user = await this.authentic.signInWithEmailAndPassword(email, password);
      return user;
    }
    catch (e){
      return null;
    }
  }
}
