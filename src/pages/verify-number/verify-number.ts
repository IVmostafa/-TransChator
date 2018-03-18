import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-verify-number',
    templateUrl: 'verify-number.html',
})
export class VerifyNumberPage {

    code;
    phoneNumber;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        if(typeof(navParams.get('id')) !== 'undefined') {
            console.log(navParams.get('id'));
        }
        if(typeof(navParams.get('phoneNumber')) !== 'undefined'
            && typeof(navParams.get('country')) !== 'undefined') {
            this.phoneNumber = '+'
                                + navParams.get('country').code
                                + ' '
                                + navParams.get('phoneNumber');
            console.log(this.phoneNumber);
        }
    }

    verify() {
        console.log(this.code);
        console.log(this.code.length);
        if(this.code.length == 13) {
            console.log('batata');
        } else if(this.code.length == 5) {
            this.code += '   ';
        } else {
            this.code += ' ';
        }
    }

}
