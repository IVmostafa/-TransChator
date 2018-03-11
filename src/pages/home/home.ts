import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GetNumberPage } from '../get-number/get-number'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController, public navParams: NavParams) { 
    }

    Continue() {
        this.navCtrl.push(GetNumberPage);
    }
}