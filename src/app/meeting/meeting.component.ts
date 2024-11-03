import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {
  topic: string = '';
  numberOfPeople: number | null = null;
  startTime: string | null = null; 
  userId: number | null = null; 
  meetings: any[] = []; // Array to hold meetings
  editingMeeting: any = null; // To track the meeting being edited

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadMeetings();
  }

  createMeeting() {
    if (this.topic && this.numberOfPeople && this.startTime) {
      const meetingData = {
        topic: this.topic,
        numberOfPeople: this.numberOfPeople,
        startTime: new Date(this.startTime).toISOString(),
        userId: this.userId
      };

      this.api.createMeeting(meetingData).subscribe({
        next: (response) => {
          alert('Meeting created successfully!');
          this.resetForm();
          this.loadMeetings(); // Reload meetings
        },
        error: (err) => {
          console.error(err);
          alert('Error creating meeting. Please try again.');
        }
      });
    } else {
      alert("Please fill in all fields!");
    }
  }

  loadMeetings() {
    this.api.getMeetings().subscribe({
      next: (meetings) => {
        this.meetings = meetings; // Store meetings in the component
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  editMeeting(meeting: any) {
    this.topic = meeting.topic;
    this.numberOfPeople = meeting.numberOfPeople;
    this.startTime = meeting.startTime;
    this.editingMeeting = meeting; // Store the meeting being edited
  }

  updateMeeting() {
    if (this.editingMeeting) {
      const updatedMeeting = {
        ...this.editingMeeting,
        topic: this.topic,
        numberOfPeople: this.numberOfPeople,
        startTime: this.startTime ? new Date(this.startTime).toISOString() : null,
      };

      this.api.updateMeeting(updatedMeeting).subscribe({
        next: (response) => {
          alert('Meeting updated successfully!');
          this.resetForm();
          this.loadMeetings(); // Reload meetings
          this.editingMeeting = null; // Clear editing state
        },
        error: (err) => {
          console.error(err);
          alert('Error updating meeting. Please try again.');
        }
      });
    }
  }

  deleteMeeting(meetingId: number) {
    this.api.deleteMeeting(meetingId).subscribe({
      next: () => {
        alert('Meeting deleted successfully!');
        this.loadMeetings(); // Reload meetings
      },
      error: (err) => {
        console.error(err);
        alert('Error deleting meeting. Please try again.');
      }
    });
  }

  resetForm() {
    this.topic = '';
    this.numberOfPeople = null;
    this.startTime = null;
    this.editingMeeting = null; // Clear editing state
  }
}
