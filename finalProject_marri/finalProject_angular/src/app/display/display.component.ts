import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NotificationService } from '../_services/notification.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  preferences;
  datas = [];
  headlines = [];
  flag = false;

  constructor(private auth: AuthService, private notif: NotificationService,  private http: HttpClient) {}

  getData(obj) {
    this.http.get('http://localhost:3030/news/newsTest' + '/' + obj[0].query).subscribe(data => {
      // @ts-ignore
      data.articles.forEach(value => {
        this.datas.push(value);
      });
    });
  }

  getHeadlines() {
    this.http.get('http://localhost:3030/news/headlines').subscribe(data => {
      // @ts-ignore
      data.articles.forEach(headline => {
        this.headlines.push(headline);
      });
    });
  }
  getUserPreferences() {
    return this.http.get('http://localhost:3030/user/userPreferences' + '/' + this.currUser());
  }

  currUser = () => {
    let userType = '';
    this.auth.currentUser.subscribe(data => {
        userType = data.username;
      }, user => {
        this.notif.showNotif('Failed to get user', 'error');
      }
    );
    return userType;
  }

  ngOnInit(): void {
    this.getUserPreferences().subscribe(preferences => {
      // @ts-ignore
      if (preferences.length === 0) {
        this.flag = true;
        this.getHeadlines();
        return;
      }
      this.preferences = preferences;
      this.getData(this.preferences);
    }, error => {
      this.notif.showNotif('Please personalize your feed first', error);
    });
  }
}
