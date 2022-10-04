import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../service/database.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private db: DatabaseService) {}
  contacts;
  docSnap;

  ngOnInit() {
    this.startup()
  }

  async startup(){
    this.docSnap = await this.db.getData();
    this.contacts = this.docSnap.contacts;
  }

}
