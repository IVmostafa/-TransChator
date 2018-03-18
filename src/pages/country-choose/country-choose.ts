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
    allCountries = [];
    search = false;
    searchString:any = '';

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        if(typeof(navParams.get('country')) !== 'undefined') {
            this.selectedCountry = navParams.get('country');
            console.log(this.selectedCountry);
        }
        firebase.database().ref('countriesCodes').on('value', (countries) => {
            for (var country in countries.val()) {
                this.allCountries.push(countries.val()[country]);
                this.countries = this.allCountries;
            }
        });
    }

    sendCountry(country) {
        this.navCtrl.push(GetNumberPage, { country: country });
    }

    startSearch() {
        this.search = true;
    }

    back() {
        if (this.search) {
            this.search = false;
        } else {
            this.sendCountry(this.selectedCountry);
        }
    }

    searchCountry() {
        if(this.searchString == '') {
            this.countries = this.allCountries;
        } else if(this.searchString.trimLeft() != this.searchString) {
            this.countries = [];
        } else {
            console.log(this.searchString);
            let countries = this.countries.filter((country) => 
                country.name.match(new RegExp(this.searchString, 'i'))
                || (country.enName
                    && country.enName.match(new RegExp(this.searchString, 'i')))
                || country.phoneCode.indexOf(this.searchString) == 0
            );
            console.log(countries);
            this.countries = countries;
        }
    }
}
