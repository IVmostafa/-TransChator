import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';

import { GetNumberPage } from '../get-number/get-number'

@IonicPage()
@Component({
    selector: 'page-country-choose',
    templateUrl: 'country-choose.html',
})
export class CountryChoosePage {

    selectedCountry;
    countries = [];
    search = false;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        if(typeof(navParams.get('country')) !== 'undefined') {
            this.selectedCountry = navParams.get('country');
            console.log(this.selectedCountry);
        }
        firebase.database().ref('countriesCodes').on('value', (countries) => {
            for (var country in countries.val()) {
                this.countries.push(countries.val()[country]);

            }
        });
    }

    sendCountry(country) {
        this.navCtrl.push(GetNumberPage, { country: country });
    }
}
