import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormControl, Validators } from '@angular/forms';

import * as firebase from 'firebase';

import { CountryChoosePage } from '../country-choose/country-choose'



@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    error:any;
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
        console.log(this.country)
    }
}