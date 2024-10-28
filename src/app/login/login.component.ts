import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private api: ApiService) {}

  login() {
    this.api.login({ username: this.username, password: this.password }).subscribe(response => {
      console.log(response);
    });
  }
}
