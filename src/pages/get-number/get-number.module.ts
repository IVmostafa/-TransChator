import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetNumberPage } from './get-number';

@NgModule({
  declarations: [
    GetNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(GetNumberPage),
  ],
})
export class GetNumberPageModule {}
