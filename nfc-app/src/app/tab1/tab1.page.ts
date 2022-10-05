import { Component, OnInit } from '@angular/core';
import { NgControlStatusGroup } from '@angular/forms';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { NFC, Ndef} from '@awesome-cordova-plugins/nfc/ngx'
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private db: DatabaseService, private barcodeScanner: BarcodeScanner) {}
  qrcodecontent = ''
  sharing = false;
  docSnap;
  scannedText: string;
  details: any;

  ngOnInit(){
    this.startup();
  }

  async startup(){
    this.docSnap = await this.db.getData();
    this.qrcodecontent = this.docSnap.name + "," + this.docSnap.email + "," + this.docSnap.phone + "," + this.docSnap.address;
  }

  toggleShare(){
    this.sharing = !this.sharing
  }

  startScanner(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedText = barcodeData?.text;
      this.addContact();
     }).catch(err => {
         console.log('Error', err);
     });
  }

  addContact(){
    this.details = this.scannedText.split(",");
    
  }

}
