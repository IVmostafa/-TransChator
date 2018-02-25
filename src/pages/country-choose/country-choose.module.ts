import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountryChoosePage } from './country-choose';

@NgModule({
  declarations: [
    CountryChoosePage,
  ],
  imports: [
    IonicPageModule.forChild(CountryChoosePage),
  ],
})
export class CountryChoosePageModule {}
