import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-verify-number',
    templateUrl: 'verify-number.html',
})
export class VerifyNumberPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        if(typeof(navParams.get('id')) !== 'undefined') {
            console.log(navParams.get('id'));
        }
        if(typeof(navParams.get('phoneNumber')) !== 'undefined') {
            console.log(navParams.get('phoneNumber'));
        }
    }

}
