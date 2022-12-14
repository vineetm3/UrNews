import {Component} from '@angular/core';
import {AuthService} from './_services/auth.service';
import {Router} from '@angular/router';
import {User} from './_models/user';
import {Role} from './_models/role';
import { NotificationService } from './_services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  initials = '';

  constructor(  private router: Router,
                private authService: AuthService,
                private notif: NotificationService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.getNames();
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.admin;
  }

  currUser = () => {
    let userType = '';
    this.authService.currentUser.subscribe(data => {
        userType = data.username;
      }, user => {
        this.notif.showNotif('Failed to get user', 'error');
      }
    );
    return userType;
  }

  getNames() {
    const username = this.currUser();
    this.authService.currentUser.subscribe(data => {
      // @ts-ignore
      this.initials = data.firstName[0].toUpperCase() + data.lastName[0].toUpperCase();
    });

    return this.initials;
  }

  get isUser() {

    return this.currentUser;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
