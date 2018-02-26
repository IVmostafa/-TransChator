import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';

import * as firebase from 'firebase';

import { CountryChoosePage } from '../country-choose/country-choose'



@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('countrySelecter') countrySelecter;
    error:any;
    countries = [];
    country = {
        name: 'Choose a country',
        code: ''
    };

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        if(typeof(navParams.get('country')) !== 'undefined') {
            this.country.name = navParams.get('country').name;
            this.country.code = navParams.get('country').phoneCode
            console.log(this.country);
        }
        firebase.database().ref('countriesCodes').on('value', (countries) => {
            for (var country in countries.val()) {
                this.countries.push(countries.val()[country]);

            }
        });
    }

    selectNumber() {
            var recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
            });
            firebase.auth().signInWithPhoneNumber('1', recaptchaVerifier)
            .then(function (confirmationResult) {
                console.log(confirmationResult);
            }).catch(function (error) {
              console.log(error);
            });
    }

    chooseCountry() {
        this.navCtrl.push(CountryChoosePage);
    }

    changeCountry() {
        if(this.country.code === '') {
             this.country.name = 'Choose a country'
        } else {
            let country = this.countries.find(country => country.phoneCode === this.country.code);
            if(typeof(country) !== 'undefined') {
                console.log(country.name);
                this.country.name = country.name;
                this.countrySelecter.setFocus();
            } else {
                this.country.name = 'invalid country code'
            }
            console.log(country);
            console.log(this.country);
        }
    }
}