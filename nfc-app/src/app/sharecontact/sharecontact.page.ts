import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sharecontact',
  templateUrl: './sharecontact.page.html',
  styleUrls: ['./sharecontact.page.scss'],
})
export class SharecontactPage implements OnInit {

  constructor(private router: Router) { }

  qrcodecontent = '';
  ngOnInit() {
    const details = this.router.getCurrentNavigation().extras.state;
    this.qrcodecontent= details.contactInfo;
  }

  return(){
    this.router.navigateByUrl('/tabs/tab2', {replaceUrl: true});
  }

}
