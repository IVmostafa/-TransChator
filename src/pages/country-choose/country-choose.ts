import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';

import { HomePage } from '../home/home'

@IonicPage()
@Component({
    selector: 'page-country-choose',
    templateUrl: 'country-choose.html',
})
export class CountryChoosePage {

    countries = [];

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        firebase.database().ref('countriesCodes').on('value', (countries) => {
            for (var country in countries.val()) {
                this.countries.push(countries.val()[country]);

            }
        });
    }

    batata(country) {
        this.navCtrl.push(HomePage, { country: country });
    }

}
