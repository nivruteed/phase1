import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {}

    createUser(user: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/createUser`, user);
    }

    login(user: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/login`, user);
    }

    createMeeting(meeting: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/meeting`, meeting);
    }
}
