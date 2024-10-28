import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent {
  topic: string = '';
  numberOfPeople: number | null = null;
  startTime: Date | null = null;
  userId: number | null = null; // Set based on logged-in user

  constructor(private api: ApiService) {}

  createMeeting() {
    if (this.topic && this.numberOfPeople && this.startTime) {
      this.api.createMeeting({
        title: this.topic,
        date: this.startTime,
        userId: this.userId
      }).subscribe(response => {
        console.log(response);
      });
    } else {
      alert("Please fill in all fields!");
    }
  }
}
