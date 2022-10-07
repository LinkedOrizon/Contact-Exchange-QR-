import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgControlStatusGroup } from '@angular/forms';
import { NavigationEnd, NavigationExtras, RouterEvent } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { NFC, Ndef} from '@awesome-cordova-plugins/nfc/ngx'
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import { ViewWillEnter, ViewDidEnter, ViewDidLeave } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, ViewDidEnter {

  constructor(private db: DatabaseService, private barcodeScanner: BarcodeScanner, private router: Router, private auth: AuthService) {
  }

  qrcodecontent = ''
  sharing = false;
  docSnap;
  scannedText: string;
  details: any;

  ngOnInit(){
    this.startup();
  }

  ionViewDidEnter() {
    this.startup();
  }

  async startup(){
    this.docSnap = await this.db.getData();
    this.qrcodecontent = this.docSnap.name + "," + this.docSnap.email + "," + this.docSnap.phone + "," + this.docSnap.address + "," + this.docSnap.company;
  }

  async toggleShare(){
    //toggles the qr code for sharing contact information
    this.docSnap = await this.db.getData();
    this.qrcodecontent = this.docSnap.name + "," + this.docSnap.email + "," + this.docSnap.phone + "," + this.docSnap.address + "," + this.docSnap.company;
    this.sharing = !this.sharing
  }

  startScanner(){
    //starts barcode scanner with the camera, and navigates to add-contact should it scan a qr code.
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedText = barcodeData?.text;
      this.addContact();
     }).catch(err => {
         console.log('Error', err);
     });
  }

  addContact(){
    //called in startScanner(), navigates with the data put into an array split into substrings
    this.details = this.scannedText.split(",");
    const navigationExtras: NavigationExtras = {
      state: {
        contactInfo: this.details
      },
    }
    this.router.navigateByUrl("/add-contact", navigationExtras);
  }

  signOut(){
    this.sharing = false;
    this.auth.logout()
    this.router.navigateByUrl("/login");
  }

}
