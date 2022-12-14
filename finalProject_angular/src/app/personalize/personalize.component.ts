import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from '../_services/auth.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-personalize',
  templateUrl: './personalize.component.html',
  styleUrls: ['./personalize.component.css']
})
export class PersonalizeComponent implements OnInit {
  Category = '';
  Query = '';
  Dates: number = Date.now();

  constructor(private http: HttpClient, private auth: AuthService, private notif: NotificationService) {
  }

  getUserPreferences() {
    this.http.get('http://localhost:3030/user/userPreferences' + '/' + this.currUser()).subscribe(values => {
      console.log(values);
      // @ts-ignore
      this.Category = values[0].category;
      // @ts-ignore
      this.Query = values[0].query;
      this.Dates = values[0].startDate;
    });
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

  public sendData() {
    const data = {
      username: this.currUser(),
      query: this.Query,
      category: this.Category,
      startDate: this.Dates,
      endDate: Date.now()
    };

    console.log(data);
    // might want to create a _service that does this method so display could call it easier
    // tslint:disable-next-line:no-shadowed-variable
    this.http.post('http://localhost:3030/news/sendData', data).subscribe(data => {
      console.log(data);
      this.notif.showNotif('Successfully saved your preferences', 'confirmation');
    }, error => {
      console.log(error);
      this.notif.showNotif('Failed to save your preferences', error)
    });
  }

  ngOnInit(): void {
    this.getUserPreferences();
  }

}
