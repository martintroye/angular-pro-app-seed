import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth/auth.sevice';
import 'rxjs/add/operator/map';
import { userInfo } from 'os';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private authService: AuthService) {

        }

        canActivate(){
            return this.authService.authState.map((user) =>{
                if(!user){
                    this.router.navigate(['auth/login']);
                }
                return !!user;

            });

        }
    
}