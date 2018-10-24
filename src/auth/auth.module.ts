import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {AngularFireModule, FirebaseAppConfig} from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { SharedModule } from './shared/shared.module';


export const ROUTES: Routes = [{
    path: 'auth',
    children: [
        {path:'', pathMatch: 'full',redirectTo: 'login' },
        {path:'login', loadChildren:'./login/login.module#LoginModule'},
        {path:'register', loadChildren:'./register/register.module#RegisterModule'}
    ]
}];

export const FIREBASECONFIG: FirebaseAppConfig = {
    apiKey: "AIzaSyCBNrujx3vdb5J2p6-7oKL4d-CdlatswkY",
    authDomain: "fitness-app-34e2c.firebaseapp.com",
    databaseURL: "https://fitness-app-34e2c.firebaseio.com",
    projectId: "fitness-app-34e2c",
    storageBucket: "fitness-app-34e2c.appspot.com",
    messagingSenderId: "613271867814"
}

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        AngularFireModule.initializeApp(FIREBASECONFIG),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        SharedModule.forRoot()
    ]
})
export class AuthModule {}