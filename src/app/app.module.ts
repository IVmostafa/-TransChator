import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CountryChoosePage } from '../pages/country-choose/country-choose'
import { GetNumberPage } from '../pages/get-number/get-number'
import { VerifyNumberPage } from '../pages/verify-number/verify-number'

import * as firebase from 'firebase';
import { firebaseConfig } from '../firebaseConfig';


firebase.initializeApp(firebaseConfig)
@NgModule({
    declarations: [
        MyApp,
        HomePage,
        GetNumberPage,
        CountryChoosePage,
        VerifyNumberPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        GetNumberPage,
        CountryChoosePage,
        VerifyNumberPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
