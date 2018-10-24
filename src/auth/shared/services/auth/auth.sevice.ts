import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {
    constructor(
        private af: AngularFireAuth,
        private ad: AngularFireDatabase
    ) {}

    createUser(email: string, password: string){
        return this.af.auth
        .createUserWithEmailAndPassword(email, password);
    }

    loginUser(email: string, password: string){
        return this.af.auth
        .signInWithEmailAndPassword(email, password);
    }
}