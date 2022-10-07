import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {

  constructor(private router: Router, private db: DatabaseService) { }

  contactInfo: string[];

  ngOnInit() {
    //get sent contact information from scan and set field to hold it
    const details = this.router.getCurrentNavigation().extras.state;
    this.contactInfo = details.contactInfo;
    
  }

  cancel(){
    this.router.navigateByUrl("/tabs", {replaceUrl: true});
  }

  async addUser(){
    //sends request to database service to add to users contacts document field in database
    await this.db.addContact(this.contactInfo);
    alert('Successfully addded contact!');
    this.router.navigateByUrl('/tabs', {replaceUrl: true});
  }

}
