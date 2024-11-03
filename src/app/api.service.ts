import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface User {
    name: string;
    email: string;
    address: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {}

    // Create a new user
    createUser(user: User): Observable<any> {
        return this.http.post(`${this.baseUrl}/create-user`, user).pipe(
            catchError((error) => {
                console.error('Error creating user:', error);
                return throwError(error);
            })
        );
    }

    // User login
    login(user: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, user);
    }

    // Create a new meeting
    createMeeting(meeting: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/schedule-meeting`, meeting).pipe( // Updated URL
            catchError((error) => {
                console.error('Error creating meeting:', error);
                return throwError(error);
            })
        );
    }

    // Get all meetings
    getMeetings(): Observable<any> {
        return this.http.get(`${this.baseUrl}/meetings`).pipe(
            catchError((error) => {
                console.error('Error fetching meetings:', error);
                return throwError(error);
            })
        );
    }

    // Update an existing meeting
    updateMeeting(meeting: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/meetings/${meeting.id}`, meeting).pipe(
            catchError((error) => {
                console.error('Error updating meeting:', error);
                return throwError(error);
            })
        );
    }

    // Delete a meeting
    deleteMeeting(meetingId: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/meetings/${meetingId}`).pipe(
            catchError((error) => {
                console.error('Error deleting meeting:', error);
                return throwError(error);
            })
        );
    }
}
