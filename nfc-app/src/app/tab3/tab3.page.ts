import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../service/database.service';
@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss']
})
export class Tab3Page implements OnInit {
  editing = true;
  edit = false;
  test = "Hello";
  info: FormGroup
  docSnap;
  name;
  phone;
  email;
  address;
  constructor(private fb: FormBuilder, private db: DatabaseService) {}

  ngOnInit() {
    this.init();
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

  load(){

  }

  toggleEdit(){
    this.edit = !this.edit;
  }
}
