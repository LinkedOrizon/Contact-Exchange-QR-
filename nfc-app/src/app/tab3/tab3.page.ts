import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { AuthService } from 'src/service/auth.service';
import { DatabaseService } from '../service/database.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit, ViewDidEnter {
  editing = true;
  edit = false;
  test = "Hello";
  info: FormGroup;
  docSnap;
  name;
  phone;
  email;
  address;

  constructor(private fb: FormBuilder, private db: DatabaseService, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.init()
  }

  async init(){
    this.docSnap = await this.db.getData();
    this.name = this.docSnap.name;
    this.phone = this.docSnap.phone;
    this.email = this.docSnap.email;
    this.address = this.docSnap.address;
    this.info = this.fb.group({
      name: [this.name, [Validators.required, Validators.minLength(1)]],
      email: [this.email],
      pnumber: [this.phone, [Validators.required, Validators.minLength(8), Validators.pattern(/^[0-9]\d*$/)]],
      address: [this.address],
    })
  }

  save(){
    this.db.saveContactInfo(this.info.value);
    this.toggleEdit();
  }

  toggleEdit(){
    this.edit = !this.edit;
  }

  ionViewDidEnter() {
    this.init();
  }

  signOut(){
    this.auth.logout();
    this.router.navigateByUrl('/login',{replaceUrl: true});

  }
}
