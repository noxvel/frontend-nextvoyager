import { Component, OnInit} from '@angular/core';

import { User } from '../models/user';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'dashboard',
    template: `<h2> Place for Dashboard </h2>
    <div>
        Users from secure api end point:
        <ul>
            <li *ngFor="let user of users">{{user.username}} {{user.email}}</li>
        </ul>
    </div> 
    <p><a [routerLink]="['/login']">Logout</a></p> `
})

export class DashboardComponent{
    users: User[] = [];
 
    constructor(private userService: UserService) { }
 
    ngOnInit() {
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            });
    }
}