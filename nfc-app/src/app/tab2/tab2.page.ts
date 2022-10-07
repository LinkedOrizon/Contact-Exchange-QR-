import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { AuthService } from 'src/service/auth.service';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, ViewDidEnter {

  constructor(private db: DatabaseService, private auth: AuthService, private router: Router) {
    this.startup();
  }
  contacts;
  docSnap;

  ngOnInit() {
    this.startup()
    this.router.onSameUrlNavigation = 'reload';
  }

  ionViewDidEnter() {
    this.startup();
  }

  async startup(){
    this.docSnap = await this.db.getData();
    this.contacts = this.docSnap.contacts;
  }

  delete(item){
    alert(item);
    this.contacts.splice(item, 1);
    this.db.updateContacts(this.contacts);
  }

  signOut(){
    this.auth.logout();
    this.router.navigateByUrl('/login',{replaceUrl: true});
  }

}
