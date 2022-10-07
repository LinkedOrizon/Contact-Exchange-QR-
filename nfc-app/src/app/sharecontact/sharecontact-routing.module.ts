import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharecontactPage } from './sharecontact.page';

const routes: Routes = [
  {
    path: '',
    component: SharecontactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharecontactPageRoutingModule {}
