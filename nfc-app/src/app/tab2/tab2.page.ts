import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
  qrcodecontent = '';
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
    //delete a contact and their information from the database
    this.contacts.splice(item, 1);
    this.db.updateContacts(this.contacts);
  }

  createQR(item: number){
    //creates a qr code for sharecontact so that another user can also get that contact information from that individual
    var cont = this.contacts.at(item);
    this.qrcodecontent = cont.name + "," + cont.email + "," + cont.phone + "," + cont.address + "," + cont.company;
    const navigationExtras: NavigationExtras = {
      state: {
        contactInfo: this.qrcodecontent
      },
    }
    this.router.navigateByUrl("/sharecontact", navigationExtras);
  }

  

  signOut(){
    this.auth.logout();
    this.router.navigateByUrl('/login',{replaceUrl: true});
  }

}
