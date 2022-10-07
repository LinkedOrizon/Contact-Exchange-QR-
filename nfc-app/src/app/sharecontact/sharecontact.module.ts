import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharecontactPageRoutingModule } from './sharecontact-routing.module';
import { QRCodeModule } from 'angularx-qrcode';

import { SharecontactPage } from './sharecontact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharecontactPageRoutingModule,
    QRCodeModule,
  ],
  declarations: [SharecontactPage]
})
export class SharecontactPageModule {}
