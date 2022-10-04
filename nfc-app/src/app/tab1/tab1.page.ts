import { Component, OnInit } from '@angular/core';
import { NFC, Ndef} from '@awesome-cordova-plugins/nfc/ngx'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(private nfc: NFC, private ndef: Ndef) {}

  ngOnInit(){
    this.nfc.addNdefListener(() => {alert('Successfully attached listener');},() => {alert('error occured');});
  }

  nfcScan(){

  }

  sendData(){
    alert('Tag');
  }

  error(){
    alert('error')
  }
}
