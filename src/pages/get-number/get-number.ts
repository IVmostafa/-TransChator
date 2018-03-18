import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import * as firebase from 'firebase';

import { VerifyNumberPage } from '../verify-number/verify-number'
import { CountryChoosePage } from '../country-choose/country-choose'

@IonicPage()
@Component({
    selector: 'page-get-number',
    templateUrl: 'get-number.html',
})  
export class GetNumberPage {

    @ViewChild('number') number;
    error:any;
    countries = [];
    country = {
        name: 'Choose a country',
        code: ''
    };
    phoneNumber = '';

    constructor(
        private alertCtrl: AlertController,
        public navParams: NavParams,
        public navCtrl: NavController 
        ) {
        if(typeof(navParams.get('country')) !== 'undefined') {
            this.country.name = navParams.get('country').name;
            this.country.code = navParams.get('country').phoneCode || navParams.get('country').code
            console.log(this.country);
        }
        firebase.database().ref('countriesCodes').on('value', (countries) => {
            for (var country in countries.val()) {
                this.countries.push(countries.val()[country]);

            }
        });
    }

    selectNumber() {
        var that = this;
        if(this.country.name === 'Choose a country') {
            that.presentAlert('length');
        } else if(this.country.name === 'invalid country code') {
            that.presentAlert('invalid');
        } else if(this.phoneNumber.length == 1) {
            that.presentAlert('short');
        } else if(this.phoneNumber.length == 0) {
            that.presentAlert('void');
        } else {
            var phone = '+' + this.country.code + this.phoneNumber;
            var recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
            });
            firebase.auth().signInWithPhoneNumber(phone, recaptchaVerifier)
            .then(function (confirmationResult) {
                that.navCtrl.push(VerifyNumberPage, {
                    id: confirmationResult.verificationId,
                    phoneNumber: that.phoneNumber,
                    country: that.country
                });
            }).catch(function (error) {
                console.log(error.message);
                if(error.message === 'TOO_SHORT') {
                    that.presentAlert('short');
                } else if(error.message === 'TOO_LONG') {
                    that.presentAlert('long');
                }
            });
        }
    }

    chooseCountry() {
        this.navCtrl.push(CountryChoosePage, { country: this.country });
    }

    changeCountry() {
        if(this.country.code === '') {
             this.country.name = 'Choose a country'
        } else {
            let country = this.countries.filter(country => country.phoneCode === this.country.code);
            if(typeof(country[country.length - 1]) !== 'undefined') {
                console.log(country[country.length - 1]);
                this.country.name = country[country.length - 1].name;
                this.number.setFocus();
            } else {
                this.country.name = 'invalid country code'
            }
        }
    }

    presentAlert(message) {
        let alertObject = {
            subTitle: '',
            buttons: ['ok']
        }
        switch(message) {
            case 'length':
                alertObject.subTitle = 'Invalid country code length (1-3 digits only).';
                break;
            case 'invalid':
                alertObject.subTitle = 'Invalid country code.';
                break;
            case 'short':
                alertObject.subTitle = 'The phone number you entered is too short for the country: '
                                     + this.country.name
                                     + '.<br><br>include your area code if you haven\'t.';
                break;
            case 'long':
                alertObject.subTitle = 'The phone number you entered is too long for the country: '
                                     + this.country.name
                                     + '.';
                break;
            case 'void':
                alertObject.subTitle = 'Please enter your phone number.';
                break;
        }
        
        let alert = this.alertCtrl.create(alertObject);
        alert.present();
    }

}
