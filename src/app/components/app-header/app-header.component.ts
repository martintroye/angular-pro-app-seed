import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../../auth/shared/services/auth/auth.sevice';

@Component({
    selector: 'app-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['app-header.component.scss'],
    templateUrl : 'app-header.component.html'
})
export class AppHeaderComponent {
    @Output() logout = new EventEmitter<any>();
    @Input() user: User;
    
    constructor() {}

    logoutUser(){
        this.logout.emit();
    }
}